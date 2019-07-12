package com.videodasy.OLHS_frontend.Controller;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.videodasy.OLHS_frontend.Controller.RestController.Registrant;
import com.videodasy.OLHS_frontend.Controller.RestController.SystemUser;



@Controller
public class ApplicationController {
	
	/*
	 * Method to return Dashboard page
	 */
	@RequestMapping("/")
	public String landingPage() {

		return "landing/index";
		//return "DashBoard";
	}
	
	@RequestMapping("/login")
	public String login() {

		return "login";
		//return "DashBoard";
	}
	
	@RequestMapping("/registration")
	public String Registration() {

		return "Registration/NewRegistrant";
		//return "DashBoard";
	}
	/*
	@RequestMapping("/dashboard")
	public String Dashboard() {

		//return "Registration/NewRegistrant";
		return "DashBoard";
	}
	*/
	
@RequestMapping("/{page}")
  public String getPages(@PathVariable("page")String page,HttpSession session, Model model) {
	 if (session.getAttribute("a_user") != null) {
	        SystemUser user = (SystemUser) session.getAttribute("a_user");
	        Registrant r=(Registrant) session.getAttribute("a_reg");
	        if (page.equalsIgnoreCase("dashboard")) {
	            
	            if(user.getRole().equalsIgnoreCase("SuperAdmin")){
	            return "Dashboard";
	            }else{
	               
	                
	                if(r.getRegistrantCategory().equalsIgnoreCase("CITIZEN")){
	                    return "CitizenDashBoard";
	                }else if(r.getRegistrantCategory().equalsIgnoreCase("LAWYER")){
	                    return "lawyerDashboard";
	                }else if(r.getRegistrantCategory().equalsIgnoreCase("UPCOMING_LAWYER")){
	                    return "UpcomingDashboard";
	                }else if(r.getRegistrantCategory().equalsIgnoreCase("COUNCIL")){
                     return "CouncilDashboard";
					}
	                else{
	                    return "_noAccess";
	                }
	            }
	        } else if (page.equalsIgnoreCase("users")) {
	            return "UserManagement/Users";
	        } else if (page.equalsIgnoreCase("new_user")) {
	            return "UserManagement/NewUser";
	        } else if (page.equalsIgnoreCase("memberships")) {
	            return "Membership/Memberships";
	        } else if (page.equalsIgnoreCase("membership")) {
	            return "Membership/Membership";
	        }else if (page.contains("membershipDetails")) {
	        	String rguuid[] = page.split("_");
				String uuid = rguuid[1];
				String auuid = page.split("_")[2];
				model.addAttribute("muuid", uuid);
				model.addAttribute("auuid", auuid);
	            return "Membership/MembershipDetail";
	        }
	        
	        else if (page.contains("createcomplain")) {
	        	String rguuid[] = page.split("_");
				String uuid = rguuid[1];
				
				model.addAttribute("apuuid", uuid);
				
	            return "Complain/NewComplain";
	        }
	        else if (page.contains("complainDetails")) {
	        	String rguuid[] = page.split("_");
				String uuid = rguuid[1];
				
				model.addAttribute("cuuid", uuid);
				
	            return "Complain/ComplainDetails";
	        }
	        
	        else if (page.contains("lawyerDetails")) {
	        	String rguuid[] = page.split("_");
				String uuid = rguuid[1];
				
				model.addAttribute("luuid", uuid);
				
	            return "Lawyers/lawyerDetail";
	        }
	        
	        else if (page.contains("appointmentDetails")) {
	        	String rguuid[] = page.split("_");
				String uuid = rguuid[1];
				
				model.addAttribute("apuuid", uuid);
				
	            return "APPOINTMENTS/AppointmentDetail";
	        }
	        
	        else if (page.equalsIgnoreCase("new_membership")) {
	            return "Membership/NewMembership";
	        } else if (page.equalsIgnoreCase("membershiprequirements")) {
	            return "Membership/Requirements";
	        }
	        else if (page.equalsIgnoreCase("province")) {
	            if (user.getRole().equalsIgnoreCase("SuperAdmin")) {
	                return "Location/Province";
	            } else {
	                return "_noAccess";
	            }
	        } else if (page.equalsIgnoreCase("new_province")) {
	            if (user.getRole().equalsIgnoreCase("SuperAdmin")) {
	                return "Location/NewProvince";
	            } else {
	                return "_noAccess";
	            }
	        }else if (page.equalsIgnoreCase("appointment")) {
	            if (user.getRole().equalsIgnoreCase("User") ) {
	                return "APPOINTMENTS/Appointment";
	            } else {
	                return "_noAccess";
	            }
	        }
	        else if (page.equalsIgnoreCase("contract")) {
	            if (user.getRole().equalsIgnoreCase("User") ) {
	                return "Contract/contract";
	            } else {
	                return "_noAccess";
	            }
	        }
	        else if (page.equalsIgnoreCase("appointments")) {
	            if (r.getRegistrantCategory().equalsIgnoreCase("LAWYER")) {
	                return "APPOINTMENTS/Appointments";
	            } else {
	                return "_noAccess";
	            }
	        }else if (page.equalsIgnoreCase("cases")) {
	            if (r.getRegistrantCategory().equalsIgnoreCase("LAWYER")) {
	                return "Cases/cases";
	            } else {
	                return "_noAccess";
	            }
	        }else if (page.equalsIgnoreCase("new_case")) {
	            if (r.getRegistrantCategory().equalsIgnoreCase("LAWYER")) {
	                return "Cases/NewCase";
	            } else {
	                return "_noAccess";
	            }
	        }
	        else if (page.equalsIgnoreCase("contracts")) {
	            if (r.getRegistrantCategory().equalsIgnoreCase("LAWYER") || r.getRegistrantCategory().equalsIgnoreCase("CITIZEN")) {
	                return "Contract/contracts";
	            } else {
	                return "_noAccess";
	            }
	        }
	        else if (page.contains("contractDetails")) {
				if (user.getRole().equalsIgnoreCase("USER")) {
					String uuid = page.split("_")[1];
					model.addAttribute("contractUuid", uuid);
					return "Contract/ContractDetails";
				} else {
					return "_noAccess";
				}
	        }
	        else if (page.contains("caseupdate")) {
				if (user.getRole().equalsIgnoreCase("USER")) {
					String uuid = page.split("_")[1];
					model.addAttribute("caseUuid", uuid);
					return "Cases/UpdateCase";
				} else {
					return "_noAccess";
				}
	        }
	        else if (page.contains("lawyers")) {
				if (user.getRole().equalsIgnoreCase("Entity Manager")) {
					return "Lawyers/Lawyers";
				} else {
					return "_noAccess";
				}
	        }
	        else if (page.equalsIgnoreCase("complains")) {
	            if (r.getRegistrantCategory().equalsIgnoreCase("LAWYER") || r.getRegistrantCategory().equalsIgnoreCase("CITIZEN")||r.getRegistrantCategory().equalsIgnoreCase("COUNCIL")) {
	                return "Complain/Complains";
	            } else {
	                return "_noAccess";
	            }
	        }
	        
	        else if (page.equalsIgnoreCase("new_appointment")) {
	            if (user.getRole().equalsIgnoreCase("User")) {
	                return "APPOINTMENTS/NewAppointment";
	            } else {
	                return "_noAccess";
	            }
	        }
	        else if (page.equalsIgnoreCase("district")) {
	            if (user.getRole().equalsIgnoreCase("SuperAdmin")) {
	                return "Location/District";
	            } else {
	                return "_noAccess";
	            }
	        }
	        else if (page.equalsIgnoreCase("new_district")) {
	            if (user.getRole().equalsIgnoreCase("SuperAdmin")) {
	                return "Location/NewDistrict";
	            } else {
	                return "_noAccess";
	            }
	        }
	        else if (page.equalsIgnoreCase("profile")) {
	        	
	            if (user.getRole().equalsIgnoreCase("Entity Manager") || user.getRole().equalsIgnoreCase("User")) {
	                return "Registration/Profile";
	            } else {
	                return "_noAccess";
	            }
	            
	        }
	        else if(page.equalsIgnoreCase("updateEntity")){
	  	      if(user.getRole().equalsIgnoreCase("Entity Manager")||user.getRole().equalsIgnoreCase("User")){
	  	          return "Registration/UpdateEntity";
	  	      } else {
	  	                return "_noAccess";
	  	        }
	        } else if (page.contains("membershipUpdate")) {
	            if(user.getRole().equalsIgnoreCase("User")){
	                String luuid = page.split("_")[1];
	                String auuid = page.split("_")[2];
	                model.addAttribute("muuid", luuid);
	                model.addAttribute("auuid", auuid);
	                return "Membership/UpdateMembership";
	            }else{
	                return "_noAccess";
	            }
	        }

	    else{
	    return "_404";
	}
	    } else {
	        return "redirect:/";

	    }

	}		

}	
	


