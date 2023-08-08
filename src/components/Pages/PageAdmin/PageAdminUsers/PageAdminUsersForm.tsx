'use client'

import Form from '@/components/Forms'
import { useForm } from 'react-hook-form'
import { formResolver } from './schemas/form.schema'

interface IProps {
  handleFormSubmit: any
}

export default function PageAdminUsersForm({ handleFormSubmit }: IProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: formResolver,
    defaultValues: {
      name: undefined,
      email: undefined,
      status: 'todos',
      'user-type': 'todos',
    },
  })

  const onSubmit = (data: any) => {
    handleFormSubmit(data)
  }

  return (
    <Form.Root
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full justify-evenly gap-8 px-16 text-white"
    >
      <div className="w-full">
        <Form.Input.Text
          label="Nome"
          placeholder="Digite o nome do usuário"
          name="name"
          register={register('name')}
          errors={errors.name}
        />
      </div>

      <div className="w-full">
        <Form.Input.Email
          label="Email"
          placeholder="exemplo@email.com"
          name="email"
          register={register('email')}
          errors={errors.email}
        />
      </div>

      <div className="w-full">
        <Form.Dropdown
          label="Tipo de Usuário"
          register={register('user-type')}
          name="user-type"
          options={[
            { label: 'Todos', value: 'todos' },
            { label: 'Usuário', value: 'usuario' },
            { label: 'Administrador', value: 'administrador' },
          ]}
        />
      </div>

      <div className="w-full">
        <Form.Dropdown
          label="Status"
          register={register('status')}
          name="status"
          options={[
            { label: 'Todos', value: 'todos' },
            { label: 'Ativo', value: 'ativo' },
            { label: 'Suspenso', value: 'suspenso' },
          ]}
        />
      </div>

      <Form.Button
        buttonStyle={undefined}
        className="mt-3 h-14 w-1/12 self-center border-transparent bg-mesh-color-primary-1200 px-4 font-semibold text-black"
      >
        Localizar
      </Form.Button>
    </Form.Root>
  )
}
