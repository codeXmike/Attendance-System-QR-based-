import Students from "../models/Students";
import Lecturer from "../models/Lecturer";
import Admins from "../models/Admins";

export const getAdminDashboardStats = async(admnin)=>{

}
export const getLecturerDashboardStats = async(lecturer)=>{
    try {
        const lec_id = lecturer._id
        if (!lec_id) throw new Error("Lecture id needed");
        
        const lec = Lecturer.findById({lec_id})
        if (!lec) throw new Error("Lecture not found");
        
        
    } catch (error) {
        
    }
}
export const getStudentDashboardStats = async(student)=>{

}