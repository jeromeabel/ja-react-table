type UserType = {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
};

type TableBodyProps = {
  data: UserType[];
};

const TableBody = ({ data }: TableBodyProps) => {
  return (
    <tbody className="text-sm text-gray-700">
      {data.map((item, index) => {
        return (
          <tr key={index}>
            <td>{item.firstName}</td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
