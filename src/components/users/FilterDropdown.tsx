import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"
import { ChevronsUpDown, Check, Filter } from "lucide-react"
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { FilterButtonProps, Options, FilterDropdownProps } from "@/types/filter.interface"

const FormSchema = z.object({
	city: z.string().optional(),
	company: z.string().optional(),
})

function FilterButton({ children }: FilterButtonProps) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button className="cursor-pointer">
					<Filter />
					Filter
				</Button>
			</PopoverTrigger>
			<PopoverContent align="end">{children}</PopoverContent>
		</Popover>
	)
}

function CommandOptions({ options, form, field }: { options: Options[]; form: any; field: any }) {
	return (
		<Command>
			<CommandInput
				placeholder={`Search ${field.name}`}
				className="h-9"
			/>
			<CommandList>
				<CommandEmpty>{`No ${field.name} found`}</CommandEmpty>
				<CommandGroup>
					{options.map((option) => (
						<CommandItem
							value={option.label}
							key={option.value}
							onSelect={() => {
								form.setValue(field.name, option.value)
							}}
						>
							{option.label}
							<Check
								className={cn(
									"ml-auto",
									option.value === field.value
										? "opacity-100"
										: "opacity-0"
								)}
							/>
						</CommandItem>
					))}
				</CommandGroup>
			</CommandList>
		</Command>
	)
}

export default function FilterDropdown({ cities, companies, setFilterCity, setFilterCompany }: FilterDropdownProps) {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
	})

	function onSubmit(data: z.infer<typeof FormSchema>) {
		console.log(data)
		setFilterCity(data.city || "")
		setFilterCompany(data.company || "")
	}

	return (
		<FilterButton>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					<FormField
						control={form.control}
						name="city"
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<div className="flex justify-between">
									<FormLabel>City</FormLabel>
									<small
										role="button"
										className="text-indigo-500 hover:text-indigo-600 cursor-pointer text-xs"
										onClick={() => {
											form.setValue("city", "")
											setFilterCity("")
										}
										}
									>
										Reset
									</small>
								</div>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant="outline"
												role="combobox"
												className={cn(
													"flex-1 justify-between",
													!field.value && "text-muted-foreground"
												)}
											>
												{field.value
													? cities.find(
														(city) => city.value === field.value
													)?.label
													: "Select city"}
												<ChevronsUpDown className="opacity-50" />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent className="p-0 w-full" align="end">
										<CommandOptions options={cities} form={form} field={field} />
									</PopoverContent>
								</Popover>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="company"
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<div className="flex justify-between">
									<FormLabel>Company</FormLabel>
									<small
										role="button"
										className="text-indigo-500 hover:text-indigo-600 cursor-pointer text-xs"
										onClick={() => {
											form.setValue("company", "")
											setFilterCompany("")
										}
										}
									>
										Reset
									</small>
								</div>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant="outline"
												role="combobox"
												className={cn(
													"flex-1 justify-between",
													!field.value && "text-muted-foreground"
												)}
											>
												{field.value
													? companies.find(
														(company) => company.value === field.value
													)?.label
													: "Select company"}
												<ChevronsUpDown className="opacity-50" />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent className="p-0 w-full" align="end">
										<CommandOptions options={companies} form={form} field={field} />
									</PopoverContent>
								</Popover>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="flex justify-between">
						<Button type="submit" className="cursor-pointer">Apply Filter</Button>
						<Button
							variant="ghost"
							type="button"
							className="cursor-pointer"
							onClick={() => {
								form.reset()
								setFilterCity("")
								setFilterCompany("")
							}}>Reset All</Button>
					</div>
				</form>
			</Form>
		</FilterButton>
	)
}
