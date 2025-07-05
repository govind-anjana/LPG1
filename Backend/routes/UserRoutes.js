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
} from "../controller/AddDeliveryController.js";
import {
  AddKgrefill,
  deletekgrefill,
  KgrefillList,
} from "../controller/AddKgRefillController.js";

import {
  AddConsumer,
  ConsumerList,
  deleteconsumer,
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
} from "../controller/DepositController.js";
import {
  AddPenalty,
  deletePenalty,
  PenaltyList,
} from "../controller/PenaltyController.js";
import {
  AddCash,
  CashList,
  deleteCash,
} from "../controller/AddCashController.js";
import {
  deletePlant,
  PlantList,
  PlantTran,
} from "../controller/PlantTranController.js";
import { ClickatellSms } from "../controller/ClickatellController.js";
import {
  deleteEqu,
  EquiepmentList,
  EquipmentId,
  EquipmentUpdate,
} from "../controller/EquipmentListController.js";
import { CurrentStock } from "../controller/CurrentStockController.js";
const router = express.Router();

router.get("/currntstock", CurrentStock);

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
router.put("/master/:id",AgentUpdate)

router.post("/planttransaction", PlantTran);
router.get("/plantlist", PlantList);
router.delete("/plantdelete/:id", deletePlant);

router.post("/addpromotion", AddPro);
router.get("/promotionlist", AddProList);
router.delete("/deletepro/:id", deletePro);
router.put("/promtionupdate/:id",UpdatePromotion)

router.post("/addrate", AddRateEmployee);
router.get("/addratelist", AddRateList);
router.delete("/deleterate/:id", deleteRate);

router.post("/addnfr", Addnfr);
router.get("/nfrlist", nfrList);
router.delete("/deletenfr/:id", deletenfr);
router.put("/updatenfr/:id", nfrUpdate);

router.post("/addDelivery", AddDelivery);
router.get("/deliverylist", DeliveryList);
router.delete("/deletedelivery/:id", deleteDelivery);

router.post("/addkgrefill", AddKgrefill);
router.get("/kgrefilllist", KgrefillList);
router.delete("/deletekgrefill/:id", deletekgrefill);

router.post("/addconsumer", AddConsumer);
router.get("/consumerlist", ConsumerList);
router.delete("/deleteconsumer/:id", deleteconsumer);

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

router.post("/addpenalty", AddPenalty);
router.get("/penaltylist", PenaltyList);
router.delete("/deletepenalty/:id", deletePenalty);

router.post("/addcash", AddCash);
router.get("/cashlist", CashList);
router.delete("/deletecash/:id", deleteCash);

router.post("/clickatellsms", ClickatellSms);
export default router;
