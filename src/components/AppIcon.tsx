import React from "react";
import { Icon, IconProps } from "react-native-elements";

export const AppIcon = (props: IconProps): JSX.Element => {
	const { solid, ...rest } = props;

	return <Icon type="font-awesome" solid={solid ?? false} {...rest} />;
};
