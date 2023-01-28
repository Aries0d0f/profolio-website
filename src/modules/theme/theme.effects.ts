import useBaseEffects$ from '@/modules/base/base.effects';

import http from '@/worker/http/http.adapter';
import config from '@/shared/libs/config';

import type { State as ThemeState } from './theme.service';
import type { Theme, GetThemeResponse } from './theme.model';

const useThemeEffects$ = (state: ThemeState) => {
  const $base = useBaseEffects$();

  const GetTheme = (): Promise<void> =>
    http
      .get<GetThemeResponse>(
        `${config.API_ENDPOINT_ROOT}/template/theme.config.yaml`
      )
      .then((res) => res.yaml())
      .then((res) => res.theme)
      .then((theme) => GetThemeSuccess(theme))
      .catch((err) => GetThemeError(err));

  const GetThemeSuccess = (theme: Theme) => {
    state.theme = theme;
  };

  const GetThemeError = (err: Error) => {
    $base.Errorf(err, Error, 'GetThemeError');
  };

  return {
    GetTheme,
    GetThemeSuccess,
    GetThemeError
  };
};

export default useThemeEffects$;
