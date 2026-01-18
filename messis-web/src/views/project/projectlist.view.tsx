import {
  useDeleteProject,
  useGetAllProjects,
  useUpdateProject,
} from "../../hooks/use-project.api.ts"
import { useNavigate } from "react-router"
import { PlusIcon } from "@heroicons/react/24/solid"
import { useState } from "react"
import { toast } from "react-toastify"
import useAuthenticated from "../../hooks/use-authenticated.hook.ts"

const ProjectlistView = () => {
  useAuthenticated()

  const navigate = useNavigate()
  const { data: { results: projects } = {}, refetch } = useGetAllProjects("")

  const [selectedProject, setSelectedProject] = useState(null)

  const deleteMutation = useDeleteProject({
    onSuccess: () => {
      toast("Project deleted")
      refetch()
    },
    onError: (err) => {
      toast(err.message)
    },
  })

  const deleteProjectConfirmation = (project) => {
    setSelectedProject(project)
    document.getElementById("delete_modal").showModal()
  }

  const handleDeleteProject = () => {
    console.log(selectedProject)
    deleteMutation.mutate(selectedProject.id)
  }

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
                    <button
                      className="btn btn-ghost btn-xs"
                      onClick={() => deleteProjectConfirmation(project)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <dialog id="delete_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirmation</h3>
          <p className="py-4">
            Are you sure want to delete {selectedProject?.name} ?
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">No</button>
              <button className="btn ml-2" onClick={handleDeleteProject}>
                Yes
              </button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  )
}

export default ProjectlistView
