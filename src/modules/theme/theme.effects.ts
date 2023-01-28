import useBaseEffects$ from '@/modules/base/base.effects';

import http from '@/worker/http/http.adapter';
import config from '@/shared/libs/config';

import type { State as ThemeState } from './theme.service';
import type { Theme, ListThemeResponse } from './theme.model';
import { fromPairs } from 'lodash-es';

const useThemeEffects$ = (state: ThemeState) => {
  const $base = useBaseEffects$();

  const ListTheme = (): Promise<void> =>
    http
      .get<ListThemeResponse>(
        `${config.API_ENDPOINT_ROOT}/template/theme.config.yaml`
      )
      .then((res) => res.yaml())
      .then((res) => ListThemeSuccess(res.themes))
      .catch((err) => ListThemeError(err));

  const ListThemeSuccess = (themes: Theme[]) => {
    state.theme = fromPairs(themes.map((theme) => [theme.name, theme]));
  };

  const ListThemeError = (err: Error) => {
    $base.Errorf(err, Error, 'ListThemeError');
  };

  return {
    ListTheme,
    ListThemeSuccess,
    ListThemeError
  };
};

export default useThemeEffects$;
