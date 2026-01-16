import ProjectForm from "./project.form.tsx"
import { useParams } from "react-router"
import { useGetProject } from "../../hooks/use-project.api.ts"

const ProjectEditView = () => {
  const { id } = useParams()

  const { data } = useGetProject(id)

  return (
    <div className="">
      <div className="">
        <h1 className="text-xl font-bold">Projects</h1>
        <ProjectForm id={id} instanceData={data} />
      </div>
    </div>
  )
}

export default ProjectEditView
