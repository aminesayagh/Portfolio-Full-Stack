import { useFormContext } from "react-hook-form";

function ErrorMessage({ name }: { name: string }) {
    const { formState: { errors } } = useFormContext();
    const error = errors[name];
    if (!error) return null;
    return <p className="text-red-600 text-xs transition-all duration-1000">{error?.message as string}</p>;
}

export default ErrorMessage;