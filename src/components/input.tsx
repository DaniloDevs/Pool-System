interface SelectableButtonProps {
  value: number;
  onChange: (value: number) => void;
  isSelected: boolean;
  state: boolean;
  name: string;
}

export default function SelectableButton({
  value,
  name,
  onChange,
  isSelected,
  state,
}: SelectableButtonProps) {
  return (
    <>
      <button
        type="button"
        onClick={() => onChange(value)}
        className={`relative inline-flex h-9 w-24 text-center items-center px-4 py-2 text-sm font-semibold active:bg-blue-600 
                    ${
                      isSelected
                        ? 'text-white bg-blue-600 text-center hover:bg-blue-700 rounded-xl'
                        : 'text-gray-900  ring-gray-300  text-center hover:duration-200 duration-300 border-gray-500 rounded-lg hover:rounded-xl'
                    } 
                        ring-1 ring-inset transition-colors duration-300 focus:z-20 focus:outline-offset-0`}
        disabled={state}
      >
        {name}
      </button>
    </>
  );
}
