import type { Property } from 'csstype';
import type * as IColor from 'color';

export namespace Style {
  export type Color = IColor;
  export type ColorStop = `${Property.Color}${' ' | ''}${string | ''}${
    | ' '
    | ''}${string | ''}`;
  export type Angle = `${string | ''}${'to' | ''}${string | ''}`;

  export type BaseGradient = `${Angle | ''}${', ' | ''}${ColorStop}${
    | ', '
    | ''}${ColorStop}`;
  export type LinearGradient = `${
    | 'repeat-'
    | ''}linear-gradient(${BaseGradient})`;
  export type RadialGradient = `${
    | 'repeat-'
    | ''}radial-gradient(${BaseGradient})`;
  export type ConicGradient = `${
    | 'repeat-'
    | ''}conic-gradient(${BaseGradient})`;
  export type Gradient = LinearGradient | RadialGradient | ConicGradient;
}
