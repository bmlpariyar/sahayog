// Import and register all your controllers from the importmap via controllers/**/*_controller
import { application } from "controllers/application"
import { eagerLoadControllersFrom } from "@hotwired/stimulus-loading"
import AmountValidationController from "./amount_validation_controller";
eagerLoadControllersFrom("controllers", application)
application.register("amount-validation", AmountValidationController);

