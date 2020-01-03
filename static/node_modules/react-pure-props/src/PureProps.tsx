import { Component } from "react";
import equals from "shallowequal";


export default class PureProps<T = {}, U = {}> extends Component<T, U> {
    public shouldComponentUpdate(prevProps: any, prevState: any) {
        return prevState !== this.state || !equals(prevProps, this.props);
    }
}
