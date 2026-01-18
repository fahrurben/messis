import ProjectForm from "./project.form.tsx"
import { useParams } from "react-router"
import { useGetProject } from "../../hooks/use-project.api.ts"
import useAuthenticated from "../../hooks/use-authenticated.hook.ts"

const ProjectEditView = () => {
  useAuthenticated()

  const { id } = useParams()
  const projectId = id ? parseInt(id) : null

  if (projectId == null) {
    throw new Error("Project not found.")
  }

  const { data } = useGetProject(projectId)

  return (
    <div className="">
      <div className="">
        <h1 className="text-xl font-bold">Projects</h1>
        <ProjectForm id={projectId} instanceData={data} />
      </div>
    </div>
  )
}

export default ProjectEditView
