import { Input } from "reactstrap";

// interface IProps {
//     open: boolean;
//     onClose: (isCreated?: boolean) => void;
//     resource: any;
//   }

const InputField = (props: any) => {
    return (
        <Input {...props} />
    );
}

export default InputField;