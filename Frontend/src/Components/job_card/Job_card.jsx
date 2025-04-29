import { Calendar, Clock, DollarSign } from "lucide-react";

const Job_card = () => {
    return (
        
            <div className="group overflow-hidden rounded-lg border border-slate-200 bg-white transition-all hover:shadow-md ">
              <div className="p-6">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex gap-3 justify-center items-center">
                    <img src="" alt="" className="w-8 h-8 rounded-full" />
                    <h4 className="text-xl font-semibold text-slate-900">username</h4>
                  </div>
                  <span className="text-sm text-slate-500 dark:text-slate-400">1 day ago</span>
                </div>
                <h3 className="mb-2 text-lg font-bold  text-slate-900 ">
                  Physics Tutor Needed
                </h3>
                <p className="mb-4 text-slate-900 ">
                  Looking for a physics tutor for high school level. Focus on mechanics and electromagnetism.
                </p>
                <div className="flex flex-wrap gap-y-2">
                  <div className="mr-4 flex items-center text-sm text-slate-500">
                    <DollarSign className="mr-1 h-4 w-4" />
                    $30/hr
                  </div>
                  <div className="mr-4 flex items-center text-sm text-slate-500 ">
                    <Calendar className="mr-1 h-4 w-4" />3 days/week
                  </div>
                  <div className="flex items-center text-sm text-slate-500 ">
                    <Clock className="mr-1 h-4 w-4" />2 hours/session
                  </div>
                </div>
              </div> 
        </div>
       
    );
};

export default Job_card;