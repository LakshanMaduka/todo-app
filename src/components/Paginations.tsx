// function for get page numbers
type PaginationProps ={
    totalPosts : number,
    numberOfPosts: number,
    setCuttentPage: (value: number) => void,
    currentPage: number
}
function Paginations(props: PaginationProps) {
    const pages = [];
    for(let i =1 ; i<=Math.ceil(props.totalPosts/props.numberOfPosts); i++){
        pages.push(i);
    }
    let colorName: string;
     
  return <div>
    {pages.map((page,index)=>{
        if(props.currentPage===page){
            colorName = "bg-dark-brown text-white";
        }else{
            colorName = "text-dark-brown";
        }
        return <button key={index} className={`justify-center ${colorName} items-center border-2 border-dark-brown px-2 rounded-lg  font-bold mr-3`} onClick={()=>{
            props.setCuttentPage(page);
        }}>{page}</button>;
    })}
  </div>;
}

export default Paginations