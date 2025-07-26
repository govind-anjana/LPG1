import express from "express";
import {
  AddEmployees,
  deleteemployee,
  employeeId,
  employeeList,
  employeeUpdate,
} from "../controller/EmployeeController.js";
import {
  AgentEmployeeList,
  AgentEmployee,
  deleteAgent,
  AgentUpdate,
} from "../controller/AgentController.js";
import {
  AddPro,
  AddProList,
  deletePro,
  UpdatePromotion,
} from "../controller/AddPromotionController.js";
import {
  AddRateEmployee,
  AddRateList,
  deleteRate,
  UpdateRate,
} from "../controller/AddRateController.js";
import {
  Addnfr,
  deletenfr,
  nfrList,
  nfrUpdate,
} from "../controller/AddNfrController.js";
import {
  AddDelivery,
  deleteDelivery,
  DeliveryList,
  UpdateDelivery,
} from "../controller/AddDeliveryController.js";
import {
  AddKgrefill,
  deletekgrefill,
  KgrefillList,
  UpdateKg,
} from "../controller/AddKgRefillController.js";

import {
  AddConsumer,
  ConsumerList,
  deleteconsumer,
  UpdateConsumer,
} from "../controller/AddConsumerController.js";
import {
  AddDoc,
  deleteDoc,
  DocList,
  updateDoc,
} from "../controller/AddDocumentController.js";
import {
  AddSale,
  deleteSale,
  SaleList,
  UpdateSale,
} from "../controller/AddSaleController.js";
import {
  AddExpense,
  deleteExpense,
  ExpenseList,
  UpdateAddExpense,
} from "../controller/AddExpenseController.js";
import {
  deleteExpenseHead,
  ExpenseHead,
  ExpenseHeadList,
  UpdateExpenseHead,
} from "../controller/ExpenseHeadController.js";
import {
  BulkDocument,
  BulkDocumentList,
  deleteBulkDocument,
  UpdateBulkDocument,
  
} from "../controller/BulkDocuemntController.js";
import {
  AddDeposit,
  deleteDepoit,
  DepositList,
  UpdateDeposity,
} from "../controller/DepositController.js";
import {
  AddPenalty,
  deletePenalty,
  PenaltyList,
  UpdatePanalty,
} from "../controller/PenaltyController.js";
import {
  AddCash,
  CashList,
  deleteCash,
  UpdateCash,
} from "../controller/AddCashController.js";
import {
  deletePlant,
  PlantList,
  PlantTran,
  UpdatePlant,
} from "../controller/PlantTranController.js";
import { ClickatellSms } from "../controller/ClickatellController.js";
import {
  deleteEqu,
  EquiepmentList,
  EquipmentId,
  EquipmentUpdate,
} from "../controller/EquipmentListController.js";
import { CurrentStock, deleteStock, UpdateStock } from "../controller/CurrentStockController.js";
import { UpdateUser, Useradmin } from "../controller/AdminUserController.js";
import { deleteItemGroup, ItemGroup, ItemGroupList, UpdateItemGroup } from "../controller/ItemGroupController.js";
const router = express.Router();

router.get("/currntstock", CurrentStock);
router.delete("/deletestock/:id",deleteStock)
router.put("/updatestock/:id",UpdateStock)

router.get("/admin",Useradmin)
router.put("/updateuser/:id",UpdateUser)

router.post("/addEmployee", AddEmployees);
router.get("/employeeList", employeeList);
router.get("/employee/:id", employeeId);
router.delete("/deleteemployee/:id", deleteemployee);
router.put("/employee/:id", employeeUpdate);

router.get("/equipment", EquiepmentList);
router.delete("/deleteEqu/:id", deleteEqu);
router.get("/equipment/:id", EquipmentId);
router.put("/equipment/:id", EquipmentUpdate);

router.post("/master", AgentEmployee);
router.get("/masterlist", AgentEmployeeList);
router.delete("/deleteagent/:id", deleteAgent);
router.put("/masters/:id",AgentUpdate);

router.post("/itemgroup",ItemGroup)
router.get("/itemgrouplist",ItemGroupList)
router.delete("/deleteItemgroup/:id",deleteItemGroup)
router.put("/itemgroup/:id",UpdateItemGroup)

router.post("/planttransaction", PlantTran);
router.get("/plantlist", PlantList);
router.delete("/plantdelete/:id", deletePlant);
router.put("/updatePlant/:id",UpdatePlant)

router.post("/addpromotion", AddPro);
router.get("/promotionlist", AddProList);
router.delete("/deletepro/:id", deletePro);
router.put("/promtionupdate/:id",UpdatePromotion)

router.post("/addrate", AddRateEmployee);
router.get("/addratelist", AddRateList);
router.delete("/deleterate/:id", deleteRate);
router.put("/updaterate/:id",UpdateRate)

router.post("/addnfr", Addnfr);
router.get("/nfrlist", nfrList);
router.delete("/deletenfr/:id", deletenfr);
router.put("/updatenfr/:id", nfrUpdate);

router.post("/addDelivery", AddDelivery);
router.get("/deliverylist", DeliveryList);
router.delete("/deletedelivery/:id", deleteDelivery);
router.put("/updatedelivery/:id",UpdateDelivery)

router.post("/addkgrefill", AddKgrefill);
router.get("/kgrefilllist", KgrefillList);
router.delete("/deletekgrefill/:id", deletekgrefill);
router.put("/updatekgrefill/:id",UpdateKg)

router.post("/addconsumer", AddConsumer);
router.get("/consumerlist", ConsumerList);
router.delete("/deleteconsumer/:id", deleteconsumer);
router.put("/updateconsumer/:id",UpdateConsumer)

router.post("/adddocument", AddDoc);
router.get("/documentlist", DocList);
router.delete("/deletedocument/:id", deleteDoc);
router.put("/updatedocument/:id",updateDoc)

router.post("/addsale", AddSale);
router.get("/salelist", SaleList);
router.delete("/deletesale/:id", deleteSale);
router.put("/updatesale/:id",UpdateSale)

router.post("/addexpense", AddExpense);
router.get("/expenselist", ExpenseList);
router.delete("/deleteexpense/:id", deleteExpense);
router.put("/updateexpense/:id", UpdateAddExpense);

router.post("/addexpensehead", ExpenseHead);
router.get("/expenseheadlist", ExpenseHeadList);
router.delete("/deleteexpensehead/:id", deleteExpenseHead);
router.put("/updateexpenses/:id", UpdateExpenseHead);

router.post("/addbulkdoc", BulkDocument);
router.get("/bulkdoclist", BulkDocumentList);
router.delete("/deletebulkdoc/:id", deleteBulkDocument);
router.put("/updatebulk/:id",UpdateBulkDocument)

router.post("/adddeposit", AddDeposit);
router.get("/depositlist", DepositList);
router.delete("/deletedeposit/:id", deleteDepoit);
router.put("/updatedeposit/:id",UpdateDeposity)

router.post("/addpenalty", AddPenalty);
router.get("/penaltylist", PenaltyList);
router.delete("/deletepenalty/:id", deletePenalty);
router.put("/updatepenalty/:id",UpdatePanalty)

router.post("/addcash", AddCash);
router.get("/cashlist", CashList);
router.delete("/deletecash/:id", deleteCash);
router.put("/updatecash/:id",UpdateCash)

router.post("/clickatellsms", ClickatellSms);
export default router;
