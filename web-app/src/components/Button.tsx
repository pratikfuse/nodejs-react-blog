import { Spinner, Button as RBButton, ButtonProps } from "react-bootstrap";



interface IButtonProps extends ButtonProps {
    isLoading?: boolean;
}

export const Button: React.FC<IButtonProps> = ({ isLoading, children, ...props }) => {

    return (
        <RBButton {...props}>
            {
                isLoading && <Spinner
                    animation="border"
                    size="sm"
                    style={{ marginRight: 4 }}
                />
            }
            {children}

        </RBButton>
    )
}