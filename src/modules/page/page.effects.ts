import { forEach, fromPairs, groupBy, toPairs } from 'lodash-es';
import { useRouter } from 'vue-router';

import useBaseEffects$ from '@/modules/base/base.effects';

import { useComponent } from '@/modules/components/component.service';

import config from '@/shared/libs/config';
import http from '@/worker/http/http.adapter';

import type {
  Component,
  ComponentSet
} from '@/modules/components/component.model';
import type { State as PageState } from './page.service';
import type { Page, PageConfig } from './page.model';
import type { ListPageConfigResponse } from './page.model';
import type { Nullable } from '@/shared/types/optional';

const usePageEffects$ = (state: PageState) => {
  const component$ = useComponent();

  const base$ = useBaseEffects$();
  const router$ = useRouter();

  const ListPageConfig = (): Promise<void> =>
    http
      .get<ListPageConfigResponse>(
        `${config.API_ENDPOINT_ROOT}/template/page.config.yaml`
      )
      .then((res) => res.yaml())
      .then((res) => ListPageConfigSuccess(res.pages))
      .catch((err) => ListPageConfigError(err));

  const ListPageConfigSuccess = (configs: PageConfig[]) => {
    state.pages = configs
      .map((config, index) => generatePage(config, index))
      .filter((page) => !!page) as Page[];
  };

  const ListPageConfigError = (err: Error) => {
    base$.Errorf(err, Error, 'ListPageConfigError');
  };

  const SetPageNumber = (id: Page['id'], number: number): void => {
    const page = state.pages.find((page) => page.id === id);

    if (page) {
      page.number = number;
    }
  };

  const linkMetadata = (
    component: Component,
    metadata?: Component['metadata']
  ) => ({
    ...component,
    metadata
  });

  const linkMetadataFromSet = (
    components: ComponentSet,
    metadataSet: { [key: string]: Pick<Component, 'metadata'> }
  ) =>
    fromPairs(
      toPairs(components).map(([name, component]) => [
        name,
        linkMetadata(component, metadataSet[name].metadata)
      ])
    );

  const generatePage = (config: PageConfig, index: number): Nullable<Page> => {
    try {
      component$.Loader(config.layout);
      component$.Loader(config.content);

      if (config.header) component$.Loader(config.header);
      if (config.footer) component$.Loader(config.footer);
      toPairs(config.injectable).forEach(([_, component]) =>
        component$.Loader(component)
      );
      toPairs(config.style).forEach(([_, component]) =>
        component$.Loader(component)
      );

      const newPage = {
        ...config,
        number: index,
        header: config.header
          ? linkMetadata(
              component$.get(config.header.name).value,
              config.header.metadata
            )
          : undefined,
        footer: config.footer
          ? linkMetadata(
              component$.get(config.footer.name).value,
              config.footer.metadata
            )
          : undefined,
        layout: linkMetadata(
          component$.get(config.layout.name).value,
          config.layout.metadata
        ),
        content: linkMetadata(
          component$.get(config.content.name).value,
          config.content.metadata
        ),
        injectable: linkMetadataFromSet(
          component$.getSet(config.injectable).value,
          config.injectable
        ),
        style: linkMetadataFromSet(
          component$.getSet(config.style).value,
          config.style
        )
      };

      return newPage;
    } catch (exception) {
      if (exception instanceof Error) {
        base$.Errorf(exception, Error, `Generate Page: ${config.name}`);
      } else {
        base$.Errorf(
          `Unhandled Exception: ${exception}`,
          Error,
          `Generate Page: ${config.name}`
        );
      }

      return null;
    }
  };

  const GenerateRoutes = () => {
    forEach(groupBy(state.pages, 'layout.name'), (pages, layoutName) => {
      console.log(pages);
      router$.addRoute({
        path: '/',
        name: layoutName,
        component: pages[0].layout.instance,
        children: pages.map((page) => ({
          path: page.path.substring(1),
          name: page.name,
          components: {
            ContentView: page.content.instance
          },
          props: {
            page,
            payload: page.layout
          },
          meta: {
            page: page
          }
        }))
      });
    });

    router$.replace(router$.currentRoute.value.fullPath);
  };

  return {
    ListPageConfig,
    ListPageConfigSuccess,
    ListPageConfigError,
    SetPageNumber,
    GenerateRoutes
  };
};

export default usePageEffects$;
