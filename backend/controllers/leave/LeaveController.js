import LeaveService from "../../services/leave/LeaveService.js";

class LeaveController {

  /* ==========================
          Apply Leave
  ========================== */

  async apply(req, res) {

    try {

      const leave = await LeaveService.applyLeave(
        req.body
      );

      res.status(201).json({

        success: true,

        data: leave,

      });

    }

    catch (error) {

      res.status(400).json({

        success: false,

        message: error.message,

      });

    }

  }

  /* ==========================
          Get All Leaves
  ========================== */

  async getAll(req, res) {

    try {

      const leaves =
        await LeaveService.getLeaves();

      res.json({

        success: true,

        data: leaves,

      });

    }

    catch (error) {

      res.status(500).json({

        success: false,

        message: error.message,

      });

    }

  }

  /* ==========================
      Employee Leaves
  ========================== */

  async getEmployeeLeaves(req, res) {

    try {

      const leaves =
        await LeaveService.getEmployeeLeaves(

          req.params.employeeId

        );

      res.json({

        success: true,

        data: leaves,

      });

    }

    catch (error) {

      res.status(500).json({

        success: false,

        message: error.message,

      });

    }

  }

  /* ==========================
        Pending Leaves
  ========================== */

  async pending(req, res) {

    try {

      const leaves =
        await LeaveService.getPendingLeaves();

      res.json({

        success: true,

        data: leaves,

      });

    }

    catch (error) {

      res.status(500).json({

        success: false,

        message: error.message,

      });

    }

  }

  /* ==========================
          Get One
  ========================== */

  async getOne(req, res) {

    try {

      const leave =
        await LeaveService.getLeave(

          req.params.id

        );

      res.json({

        success: true,

        data: leave,

      });

    }

    catch (error) {

      res.status(404).json({

        success: false,

        message: error.message,

      });

    }

  }

  /* ==========================
        Approve Leave
  ========================== */

  async approve(req, res) {

    try {

      const leave =
        await LeaveService.approveLeave(

          req.params.id,

          "HR"

        );

      res.json({

        success: true,

        data: leave,

      });

    }

    catch (error) {

      res.status(400).json({

        success: false,

        message: error.message,

      });

    }

  }

  /* ==========================
        Reject Leave
  ========================== */

  async reject(req, res) {

    try {

      const leave =
        await LeaveService.rejectLeave(

          req.params.id,

          req.body.reason || ""

        );

      res.json({

        success: true,

        data: leave,

      });

    }

    catch (error) {

      res.status(400).json({

        success: false,

        message: error.message,

      });

    }

  }

  /* ==========================
          Update
  ========================== */

  async update(req, res) {

    try {

      const leave =
        await LeaveService.updateLeave(

          req.params.id,

          req.body

        );

      res.json({

        success: true,

        data: leave,

      });

    }

    catch (error) {

      res.status(400).json({

        success: false,

        message: error.message,

      });

    }

  }

  /* ==========================
          Delete
  ========================== */

  async delete(req, res) {

    try {

      await LeaveService.deleteLeave(

        req.params.id

      );

      res.json({

        success: true,

        message:
          "Leave deleted successfully",

      });

    }

    catch (error) {

      res.status(500).json({

        success: false,

        message: error.message,

      });

    }

  }

}

export default new LeaveController();