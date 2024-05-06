export default function UserProfilePage({ params }: any) {
  return (
    <div className="flex justify-center items-center h-[100vh] w-full ">
      <h1 className="text-2xl text-[red]">
        User Profile name : <span className=" text-[black] p-1 rounded-md  bg-[orange]">{params.id}</span>
      </h1>
    </div>
  );
}
