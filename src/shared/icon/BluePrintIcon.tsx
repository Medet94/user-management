import * as React from 'react';
import {
  IconName,
  SVGIconContainer,
  Icons,
  IconSize,
} from '@blueprintjs/icons';

export type BluePrintIconName = IconName;

export interface IconProps {
  name: BluePrintIconName;
  size?: number;
  className?: string;
  color?: string | 'currentColor';
  autoLoad?: boolean;
  title?: string;
  tagName?: string;
  style?: React.CSSProperties;
  onPathsLoaded?: (paths: string[]) => void;
}
export const BluePrintIcon: React.FC<IconProps> = React.forwardRef(
  function Icon(
    {
      autoLoad = true,
      className = '',
      color = 'currentColor',
      name,
      tagName = 'span',
      title,
      size = IconSize.STANDARD,
      style,
      onPathsLoaded,
      ...htmlProps
    },
    ref
  ) {
    // State for holding the icon path data once loaded
    const [iconPaths, setIconPaths] = React.useState<string[] | undefined>(
      undefined
    );
    // Effect to load icon asynchronously if necessary
    React.useEffect(() => {
      let cancelLoading = false;

      if (typeof name === 'string') {
        const loadedPaths = Icons.getPaths(name, size);

        if (loadedPaths) {
          setIconPaths(loadedPaths);
          if (onPathsLoaded) {
            onPathsLoaded(loadedPaths);
          }
        } else if (autoLoad) {
          Icons.load(name, size)
            .then(() => {
              if (!cancelLoading) {
                setIconPaths(Icons.getPaths(name, size));
                if (onPathsLoaded) {
                  onPathsLoaded(Icons.getPaths(name, size));
                }
              }
            })
            .catch((err) => {
              console.error(`[Blueprint] Icon '${name}' failed to load.`, err);
            });
        }
      }

      return () => {
        cancelLoading = true;
      };
    }, [autoLoad, name, size, onPathsLoaded]);

    // Handle case where the icon is not provided or is falsy
    if (!name) {
      return null;
    }

    // Handle case where the icon is a JSX element (fallback, not common)
    if (typeof name !== 'string') {
      return name;
    }

    // Fallback to font icon if no paths are available
    if (!iconPaths) {
      return React.createElement(tagName, {
        'aria-hidden': title ? undefined : true,
        className: className,
        'data-icon': name,
        ref,
        title: title,
        ...htmlProps, // Ensure non-HTML props are passed correctly
      });
    }

    // Render SVG if icon paths are loaded
    const pathElements = iconPaths.map((d, i) => (
      <path key={i} d={d} fillRule="evenodd" />
    ));

    return (
      <SVGIconContainer
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          ...(style || {}),
        }}
        className={className}
        color={color}
        htmlTitle={title}
        iconName={name}
        ref={ref}
        size={size}
        title={title}
        children={pathElements}
        {...htmlProps} // Apply additional props
      />
    );
  }
);
