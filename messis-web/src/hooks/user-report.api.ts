import {useQuery} from "@tanstack/react-query";
import {API_URL} from "../helpers/constant.ts";
import axios from "axios";
import moment from "moment";

const useGetReportSummary = (project_id, from_date, to_date) => {
  return useQuery({
    queryKey: ["report_summary", project_id, from_date, to_date],
    queryFn: async () => {
      const url = `${API_URL}/report/get_summary`

      const params: Record<string, string> = {}

      params["project_id"] = project_id
      params["from_date"] = moment(from_date).format("YYYY-MM-DD")
      params["to_date"] = moment(to_date).format("YYYY-MM-DD")

      const paramString = new URLSearchParams(params)
      const response = await axios.get(url + "?" + paramString)
      return response.data
    },
    enabled: !!project_id,
  })
}

export { useGetReportSummary }