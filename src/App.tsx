import { useForm } from "react-hook-form";

export function App() {
  const { handleSubmit: hookFormSubmit, register, formState } = useForm();

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
    <div className="min-h-screen flex items-center justify-center">
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <input
            type="text"
            className="text-black"
            {...register("name", {
              minLength: 2,
              required: true,
            })}
          />
          {formState.errors.name?.type === 'required' && <small className="text-red-500">Preencha este campo</small>}
          {formState.errors.name?.type === 'minLength' && <small className="text-red-500">Tem q ter 2 digitos</small>}
        </div>
        <div className="flex flex-col">
          <input
            type="number"
            className="text-black"
            {...register("age", {
              min: 18,
              max: 99,
              setValueAs: (value) => Number(value),
              required: true,
            })}
          />

          {formState.errors.age && <small className="text-red-500">Deu ruim aqui</small>}
        </div>

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
