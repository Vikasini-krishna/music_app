import PlaylistSkeleton from "@/components/skeletons/PlaylistSkeleton";
import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useMusicStore } from "@/stores/useMusicStore";
import { SignedIn } from "@clerk/clerk-react";
import { HomeIcon, Library, MessageCircle } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const LeftSidebar = () => {
	const { albums, fetchAlbums, isLoading } = useMusicStore();

	useEffect(() => {
		fetchAlbums();
	}, [fetchAlbums]);

	console.log({ albums });

	return (
		<div className='h-full flex flex-col gap-2'>
			{/* Navigation menu */}
			<div className='rounded-lg bg-gradient-to-b from-purple-300 to-purple-900 p-4 shadow-lg'>
				<div className='space-y-2'>
					<Link
						to={"/"}
						className={cn(
							buttonVariants({
								variant: "ghost",
								className:
									"w-full justify-start text-purple-900 hover:bg-purple-600/80 transition duration-300 shadow-sm",
							})
						)}
					>
						<HomeIcon className='mr-2 size-5' />
						<span className='hidden md:inline'>Home</span>
					</Link>

					<SignedIn>
						<Link
							to={"/chat"}
							className={cn(
								buttonVariants({
									variant: "ghost",
									className:
										"w-full justify-start text-purple-900 hover:bg-purple-600/80 transition duration-300 shadow-sm",
								})
							)}
						>
							<MessageCircle className='mr-2 size-5' />
							<span className='hidden md:inline'>Messages</span>
						</Link>
					</SignedIn>
				</div>
			</div>

			{/* Library section */}
			<div className='flex-1 rounded-lg bg-gradient-to-b from-purple-300 to-purple-900 p-4 shadow-lg'>
				<div className='flex items-center justify-between mb-4'>
					<div className='flex items-center text-purple-900 px-2 font-semibold'>
						<Library className='size-5 mr-2' />
						<span className='hidden md:inline'>Playlists</span>
					</div>
				</div>

				<ScrollArea className='h-[calc(100vh-300px)]'>
					<div className='space-y-2'>
						{isLoading ? (
							<PlaylistSkeleton />
						) : (
							albums.map((album) => (
								<Link
									to={`/albums/${album._id}`}
									key={album._id}
									className='p-2 rounded-md flex items-center gap-3 group cursor-pointer bg-purple-400/50 hover:bg-purple-600/80 transition duration-300 shadow-md'
								>
									<img
										src={album.imageUrl}
										alt='Playlist img'
										className='size-12 rounded-md flex-shrink-0 object-cover shadow-md'
									/>

									<div className='flex-1 min-w-0 hidden md:block'>
										<p className='font-medium truncate text-purple-900 drop-shadow-md'>
											{album.title}
										</p>
										<p className='text-sm text-purple-700 truncate drop-shadow-sm'>
											Album • {album.artist}
										</p>
									</div>
								</Link>
							))
						)}
					</div>
				</ScrollArea>
			</div>
		</div>
	);
};
export default LeftSidebar;
