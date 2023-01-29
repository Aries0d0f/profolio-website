import { fromPairs, forEach } from 'lodash-es';

import useBaseEffects$ from '@/modules/base/base.effects';

import http from '@/worker/http/http.adapter';
import config from '@/shared/libs/config';

import palette from '@/assets/styles/scss/modules/palette.module.scss';

import type { State as ThemeState } from './theme.service';
import type { Theme, ListThemeResponse } from './theme.model';

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

  const StyleVariablesBinder = (theme: Theme) => {
    const { palettes } = theme;

    forEach(palettes, (value, key) => {
      document.documentElement.style.setProperty(
        `--${key}`,
        `${
          /^\$/.test(value.toString())
            ? palette[value.toString().substring(1)] ?? value
            : value
        }`
      );
    });
  };

  return {
    ListTheme,
    ListThemeSuccess,
    ListThemeError,
    StyleVariablesBinder
  };
};

export default useThemeEffects$;
