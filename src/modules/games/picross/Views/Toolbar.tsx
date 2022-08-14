import { Container, Select, Group, TextInput, Button, Text } from "@mantine/core";
import { useMemo } from "react";
import { Resize, Seeding } from "tabler-icons-react";
import { usePicrossContext } from "../contexts/Picross.context";

const DEFAULT_OPTIONS = ['5x5', '5x10', '10x10' ]

export interface Toolbar {
  /** array of `{rows}x{columns}` as in `['5x5', '5x10', ...]` */
  sizeOptions?: string[];
}

export const Toolbar: React.FC<Toolbar> =({sizeOptions = DEFAULT_OPTIONS }) => {
  const { seed, sizes, solve, solved, createNew, changeSize } = usePicrossContext();

  const handleNew = () => createNew();
  const selectValue = useMemo(() => `${sizes.rows}x${sizes.cols}`, [sizes]);
  const handleSelect = (value: string) => {
    const [rows, cols] = value.split('x').map(Number);
    changeSize(rows, cols);
  }

  return (
    <Container>
      <Group direction="row" position="center">
        <TextInput icon={<Seeding size={16} />} size="sm" value={seed} disabled />
        <Select icon={<Resize size={16} />} size="sm" data={sizeOptions} value={selectValue} onChange={handleSelect} sx={{input: {width: 120 }}} />
        <Button uppercase onClick={handleNew}>new</Button>
        <Button size="sm" uppercase disabled={solved} onClick={solve}>solve</Button>
      </Group>
    </Container>
  )
}
