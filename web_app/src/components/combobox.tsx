"use client"

import * as React from "react"
import { X, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
} from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"

const FormSchema = z.object({
  language: z.string({
    required_error: "Please select a language.",
  }),
})

export function ComboboxForm({ items }: { items: { label: string; value: string }[] }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const [selectedValues, setSelectedValues] = React.useState<string[]>([])

  const toggleValue = (value: string) => {
    setSelectedValues((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    )
  }

  const removeValue = (value: string) => {
    setSelectedValues((prev) => prev.filter((item) => item !== value))
  }

  function onSubmit() {
    console.log("Selected values:", selectedValues)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Vista superior con elementos seleccionados */}
        <div className="flex flex-wrap gap-2">
          {selectedValues.map((value) => (
            <div
              key={value}
              className="flex items-center gap-2 rounded-md bg-gray-200 px-3 py-1 text-sm"
            >
              <span>
                {items.find((item) => item.value === value)?.label}
              </span>
              <button
                onClick={() => removeValue(value)}
                className="text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Lista desplegable */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className={cn(
                "w-[200px] justify-between",
                selectedValues.length === 0 && "text-muted-foreground"
              )}
            >
              {selectedValues.length > 0
                ? "Selected items"
                : "Select items..."}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search items..." className="h-9" />
              <CommandList>
                <CommandEmpty>No items found.</CommandEmpty>
                <CommandGroup>
                  {items.map((item) => (
                    <CommandItem key={item.value} value={item.value}>
                      <label className="flex items-center gap-2">
                        <Checkbox
                          checked={selectedValues.includes(item.value)}
                          onCheckedChange={() => toggleValue(item.value)}
                        />
                        {item.label}
                      </label>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export function ComboboxDemo({
  items,
  onSelectionChange,
}: {
  items: { label: string; value: string }[];
  onSelectionChange: (selectedValues: string[]) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [selectedValues, setSelectedValues] = React.useState<string[]>([]);

  const toggleValue = (value: string) => {
    const updatedValues = selectedValues.includes(value)
      ? selectedValues.filter((item) => item !== value) // Si ya está seleccionado, lo elimina
      : [...selectedValues, value]; // Si no está seleccionado, lo agrega

    setSelectedValues(updatedValues);
    onSelectionChange(updatedValues); // Notifica al componente padre
  };

  const removeValue = (value: string) => {
    const updatedValues = selectedValues.filter((item) => item !== value);
    setSelectedValues(updatedValues);
    onSelectionChange(updatedValues); // Notifica al componente padre
  };

  return (
    <div className="space-y-4">
      {/* Vista superior con elementos seleccionados */}
      <div className="flex flex-col gap-2">
        {selectedValues.map((value) => (
          <div
            key={value}
            className="flex items-center justify-between gap-2 rounded-md bg-gray-200 px-3 py-1 text-sm"
          >
            <span>{items.find((item) => item.value === value)?.label}</span>
            <button
              onClick={() => removeValue(value)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Lista desplegable */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {selectedValues.length > 0
              ? "Selected items"
              : "Select items..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search items..." />
            <CommandList>
              <CommandEmpty>No items found.</CommandEmpty>
              <CommandGroup>
                {items.map((item) => (
                  <CommandItem key={item.value} value={item.value}>
                    <label className="flex items-center gap-2">
                      <Checkbox
                        checked={selectedValues.includes(item.value)}
                        onCheckedChange={() => toggleValue(item.value)}
                      />
                      {item.label}
                    </label>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
