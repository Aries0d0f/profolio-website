import type { Property } from 'csstype';

import type { Page } from '@/modules/page/page.model';
import type { GeneralMap, OptionalMap } from '@/shared/types/object';

export namespace GeneralComponent {
  export type Instance = {
    iterator: Iterator.Props;
    'bounding-box': DOMRect;
  } & Content.Props &
    I18n.Props;

  export type Size = {
    max?: Property.FlexGrow;
    min?: Property.FlexShrink;
    basis: Property.FlexBasis;
  };

  export interface Props {
    name?: string;
    context?: Page;
    metadata?: GeneralMap & OptionalMap<Instance>;
    data?: GeneralMap;
  }

  export namespace Content {
    export type Payload = {
      name?: string;
      text: string;
    };
    export type Props = {
      contents?: Payload[];
      content?: Payload;
    };
  }

  export namespace Button {
    export type Payload = Content.Payload & {
      link?: string;
      icon?: string;
      external?: boolean;
    };
    export type Props = {
      content?: Payload;
    };
  }

  export namespace Iterator {
    export type Props = {
      template?: string;
      selector?: string;
    };
  }

  export namespace I18n {
    export type Payload = Record<string, string>;
    export type Props = {
      i18n?: Record<string | 'default', Payload>;
    };
  }
}
