import React from "react";
import { RegisterService } from "./registerServices";

export function wire<TWithoutServices> (Component: React.ComponentType<any>, services: string[]) : React.ComponentType<any> {
    class ComponentWithInjectedServices extends React.Component {
        mappedServices : any = {};
        constructor(props: TWithoutServices) {
            super(props);
            services.forEach(service => {
                this.mappedServices[service] = RegisterService.retreive(service);
            })
        }
        render() {
            return <Component {...this.props} {...this.state} {...this.mappedServices}></Component>
        }
    }
    return ComponentWithInjectedServices;
}