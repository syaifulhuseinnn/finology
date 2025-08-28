import type { User } from "@/types/user.interface";
import { type ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react"
import Avatar from "./Avatar";

export const columns: ColumnDef<User>[] = [
	{
		accessorKey: "name",
		header: "Name",
		cell: ({ row: { original: { name } } }) => (
			<div className="flex items-center gap-2">
				<Avatar name={name} />
				{name}
			</div>
		),
	},
	{
		accessorKey: "email",
		header: "Email",
		cell: ({ row: { original: { email } } }) => email.toLowerCase(),
	},
	{
		accessorKey: "city",
		header: "City",
		cell: ({ row: { original: { address } } }) => address.city,
	},
	{
		accessorKey: "company",
		header: "Company",
		cell: ({ row: { original: { company } } }) => company.name,
	},
	{
		accessorKey: "phone",
		header: "Phone",
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: "website",
		header: "Website",
		cell: ({ row: { original: { website } } }) => <a href="#" className="text-blue-500">{website}</a>,
	},
	{
		id: "actions",
		header: "",
		cell: () => <Button variant="ghost" className="text-indigo-500 hover:text-indigo-600 hover:cursor-pointer">
			View <ArrowRight />
		</Button>,
	}
]