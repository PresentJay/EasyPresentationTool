# react-pure-props [![npm version](https://badge.fury.io/js/react-pure-props.svg)](https://badge.fury.io/js/react-pure-props)

It is a little different from the `PureComponent` of react.

First, compare only the props. If the state does not change, do not re-render.

However, if the update does not change only through `setState`, it also re-render.

## Installation
### npm
```bash
$ npm install react-pure-props
```
## How to use
```tsx
import PureProps from "react-pure-props";

class Component extends PureProps<{}, {}> {
    public render() {
        return (
            <div />
        );
    }
}
```


## License

```
MIT License

Copyright (c) 2019 Daybrush
```
