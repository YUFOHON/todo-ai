interface Board{
  columns: Map<any,any>;
}

type TypedColumn ="todo"| "inprogess"| "done"

interface Column{
    id:TypedColumn,
    todos:Todo[],
}

interface Todo{
    $id:string,
    $createdAt:string,
    title:string,
    status:string,
    image?:Image,
}

interface Image{
    bucketID:string,
    fieldID:string,

}