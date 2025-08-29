import type { AvatarProps } from '@/types/avatar.interface';
import { AvatarImage, Avatar as AvatarShadcn, AvatarFallback } from '../ui/avatar'

export default function Avatar({ name }: AvatarProps) {
	const backgroundColors = "39FF14,FF073A,FCEE09,0FF0FC,FE019A,FFB300,FF3131,BFFF00,FF6EC7,FF5F1F";
	const imageUrl = `https://api.dicebear.com/9.x/open-peeps/svg?seed=${name}&backgroundColor=${backgroundColors}`;

	return (
		<AvatarShadcn>
			<AvatarImage src={imageUrl} alt={name} />
			<AvatarFallback>{name}</AvatarFallback>
		</AvatarShadcn>
	)
}
