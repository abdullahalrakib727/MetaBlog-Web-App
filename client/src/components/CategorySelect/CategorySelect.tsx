export type OptionProps = {
  value: string;
  label: string;
};

interface CategorySelectProps {
  category: string | null;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  categoryList: OptionProps[];
}

const CategorySelect = ({
  category,
  handleChange,
  categoryList,
}: CategorySelectProps) => {
  return (
    <div className="justify-center md:justify-between items-center  my-10 text-center flex flex-col gap-5 md:flex-row">
      <select
        value={category || "default"}
        onChange={(e) => handleChange(e)}
        className=" border px-3 py-1 bg-[#F4F4F5] dark:text-[#A1A1AA] dark:bg-[#242535] dark:border-none rounded-md max-w-xs"
      >
        {categoryList.map((category) => (
          <option key={category.value} value={category.value}>
            {category.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategorySelect;
