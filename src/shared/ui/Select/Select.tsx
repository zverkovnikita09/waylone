import * as RadixSelect from "@radix-ui/react-select";
import { SelectItem } from "./SelectItem";

interface SelectProps {}

export const Select = () => {
  return (
    <RadixSelect.Root>
      <RadixSelect.Trigger
        className="inline-flex h-[35px] items-center justify-center gap-[5px] rounded bg-white px-[15px] text-[13px] leading-none text-violet11 shadow-[0_2px_10px] shadow-black/10 outline-none hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-violet9"
        aria-label="Food"
      >
        <RadixSelect.Value placeholder="RadixSelect a fruit…" />
        <RadixSelect.Icon className="text-violet11">
          {/* <ChevronDownIcon /> */}
        </RadixSelect.Icon>
      </RadixSelect.Trigger>
      <RadixSelect.Portal>
        <RadixSelect.Content className="overflow-hidden rounded-md bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
          <RadixSelect.ScrollUpButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-violet11">
            {/* <ChevronUpIcon /> */}
          </RadixSelect.ScrollUpButton>
          <RadixSelect.Viewport className="p-[5px]">
            <RadixSelect.Group>
              <RadixSelect.Label className="px-[25px] text-xs leading-[25px] text-mauve11">
                Fruits
              </RadixSelect.Label>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </RadixSelect.Group>

            <RadixSelect.Separator className="m-[5px] h-px bg-violet6" />

            <RadixSelect.Group>
              <RadixSelect.Label className="px-[25px] text-xs leading-[25px] text-mauve11">
                Vegetables
              </RadixSelect.Label>
              <SelectItem value="aubergine">Aubergine</SelectItem>
              <SelectItem value="broccoli">Broccoli</SelectItem>
              <SelectItem value="carrot" disabled>
                Carrot
              </SelectItem>
              <SelectItem value="courgette">Courgette</SelectItem>
              <SelectItem value="leek">Leek</SelectItem>
            </RadixSelect.Group>

            <RadixSelect.Separator className="m-[5px] h-px bg-violet6" />

            <RadixSelect.Group>
              <RadixSelect.Label className="px-[25px] text-xs leading-[25px] text-mauve11">
                Meat
              </RadixSelect.Label>
              <SelectItem value="beef">Beef</SelectItem>
              <SelectItem value="chicken">Chicken</SelectItem>
              <SelectItem value="lamb">Lamb</SelectItem>
              <SelectItem value="pork">Pork</SelectItem>
            </RadixSelect.Group>
          </RadixSelect.Viewport>
          <RadixSelect.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-violet11">
            {/* <ChevronDownIcon /> */}
          </RadixSelect.ScrollDownButton>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
};

