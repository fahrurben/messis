import { useGetAllProjects } from "../../hooks/use-project.api.ts"
import { useNavigate } from "react-router"
import { PlusIcon } from "@heroicons/react/24/solid"

const ProjectlistView = () => {
  const navigate = useNavigate()
  const { data: { results: projects } = {}, refetch } = useGetAllProjects("")

  return (
    <div className="">
      <div className="flex">
        <h1 className="text-xl font-bold mr-auto">Projects</h1>
        <button className="btn" onClick={() => navigate("/projects/create")}>
          <PlusIcon class="size-6" />
          Create
        </button>
      </div>
      <div className="overflow-x-auto mt-8">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Code</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects?.map((project) => {
              return (
                <tr key={project.id}>
                  <td>{project.name}</td>
                  <td>{project.code}</td>
                  <td>{project.start_date}</td>
                  <td>{project.end_date}</td>
                  <td>
                    <button
                      className="btn btn-ghost btn-xs"
                      onClick={() => navigate(`/projects/edit/${project.id}`)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProjectlistView
