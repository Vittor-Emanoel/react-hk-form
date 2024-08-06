import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import { Button } from "./components/ui/Button";
import { Input } from "./components/ui/Input";

interface IFormData {
  name: string;
  age: number;
}

export function App() {
  const {
    handleSubmit: hookFormSubmit,
    register,
    formState,
    clearErrors
  } = useForm<IFormData>();

  const handleSubmit = hookFormSubmit(
    (data) => {
      console.log("submitting");
      console.log(data);
    },
    (errors) => {
      console.log(errors);
    }
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <form className="flex flex-col gap-2 w-96" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <Input
            placeholder="Nome"
            {...register("name", {
              required: {
                value: true,
                message: "preencha o nome!",
              },
            })}
          />
          <ErrorMessage
            errors={formState.errors}
            name="name"
            render={({ message }) => (
              <small className="text-red-500">{message}</small>
            )}
          />
        </div>
        <div className="flex flex-col">
          <Input
            placeholder="Idade"
            type="number"
            {...register("age", {
              required: {
                value: true,
                message: "preencha a idade!",
              },
            })}
          />

          {formState.errors.age && (
            <small className="text-red-500">Deu ruim aqui</small>
          )}
        </div>

        <Button className="mt-4">Enviar</Button>
      </form>

      <Button size="sm" variant="outline" onClick={() => clearErrors()} className="mt-4">
        Limpar errros
      </Button>
    </div>
  );
}
