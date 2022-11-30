import React from "react";

export function useForm(inputValues: any) {
    const [values, setValues] = React.useState(inputValues);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;

        setValues({ ...values, [name]: value });
    };
    return { values, handleChange, setValues };
}
