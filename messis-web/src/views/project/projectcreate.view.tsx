import ProjectForm from "./project.form.tsx"
import useAuthenticated from "../../hooks/use-authenticated.hook.ts"

const ProjectCreateView = () => {
  useAuthenticated()

  return (
    <div className="">
      <div className="">
        <h1 className="text-xl font-bold">Projects</h1>
        <ProjectForm />
      </div>
    </div>
  )
}

export default ProjectCreateView
