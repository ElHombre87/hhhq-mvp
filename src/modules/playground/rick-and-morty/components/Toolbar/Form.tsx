import { Group, Select, TextInput, Button } from '@mantine/core';
import { useForm } from '@mantine/hooks';

const status = ['Alive', 'Dead', 'Unknown'];
const gender = ['Male', 'Female', 'Unknown'];

export interface FilterFormValues {
  name: string;
  status: typeof status[number],
  gender: typeof gender[number],
}
const initialValues = { name: '', status: '', gender: '' };

export interface FilterForm {
  loading: boolean
  error: boolean
  onSubmit: (values: FilterFormValues) => void;
}
export const FilterForm: React.FC<FilterForm> = ({ onSubmit, loading, error }) => {
  const form = useForm<FilterFormValues>({ initialValues });
  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Group position="apart">
        <Group direction="row">
          <TextInput placeholder="Search a character" {...form.getInputProps('name')} />
          <Select data={status} placeholder="status" {...form.getInputProps('status')} />
          <Select data={gender} placeholder="gender" {...form.getInputProps('gender')} />
        </Group>
        <Group direction="row">
          <Button loading={loading} disabled={loading} uppercase type="submit" variant="subtle">
            {error ? 'retry' : 'search'}
          </Button>
          <Button disabled={loading} uppercase type="reset" variant="subtle" onClick={form.reset}>
            reset
          </Button>
        </Group>
      </Group>
    </form>
  );
};
