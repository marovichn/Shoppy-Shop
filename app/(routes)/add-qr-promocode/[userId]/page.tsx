
import Container from "@/components/ui/container";
import QrClient from "./components/QrClient";


const page = ({params}:{params:{userId:string}}) => {
  return (
    <QrClient userId={params.userId}/>
  );
};

export default page;
