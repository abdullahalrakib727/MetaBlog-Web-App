interface CategorySelectProps {
  category: string | null;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CategorySelect = ({ category, handleChange }: CategorySelectProps) => {
  return (
    <div className="justify-center md:justify-between items-center  my-10 text-center flex flex-col gap-5 md:flex-row">
      <select
        value={category || "default"}
        onChange={(e) => handleChange(e)}
        className=" border px-3 py-1 bg-[#F4F4F5] dark:text-[#A1A1AA] dark:bg-[#242535] dark:border-none rounded-md max-w-xs"
      >
        <option value="">All Categories</option>
        <option value="Lifestyle">Life Style</option>
        <option value="Technology">Technology</option>
        <option value="Travel">Travel</option>
        <option value="Business">Business</option>
        <option value="Economy">Economy</option>
        <option value="Sports">Sports</option>
      </select>
    </div>
  );
};

export default CategorySelect;
