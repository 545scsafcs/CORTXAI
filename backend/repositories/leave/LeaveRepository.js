import Leave from "../../models/leave/Leave.js";

class LeaveRepository {

  /* ==========================
          Create
  ========================== */

  async create(data) {

    return await Leave.create(data);

  }

  /* ==========================
          Get All
  ========================== */

  async findAll() {

    return await Leave.find()

      .populate("employee")

      .sort({

        createdAt: -1,

      });

  }

  /* ==========================
      Get By Employee
  ========================== */

  async findByEmployee(employeeId) {

    return await Leave.find({

      employeeId,

    })

      .populate("employee")

      .sort({

        createdAt: -1,

      });

  }

  /* ==========================
          Get By Id
  ========================== */

  async findById(id) {

    return await Leave.findById(id)

      .populate("employee");

  }

  /* ==========================
      Pending Leaves
  ========================== */

  async findPending() {

    return await Leave.find({

      status: "Pending",

    })

      .populate("employee")

      .sort({

        createdAt: -1,

      });

  }

  /* ==========================
          Approve
  ========================== */

  async approve(id, approvedBy) {

    return await Leave.findByIdAndUpdate(

      id,

      {

        status: "Approved",

        approvedBy,

        approvedAt: new Date(),

      },

      {

        new: true,

      }

    ).populate("employee");

  }

  /* ==========================
          Reject
  ========================== */

  async reject(id, reason) {

    return await Leave.findByIdAndUpdate(

      id,

      {

        status: "Rejected",

        rejectReason: reason,

      },

      {

        new: true,

      }

    ).populate("employee");

  }

  /* ==========================
          Update
  ========================== */

  async update(id, data) {

    return await Leave.findByIdAndUpdate(

      id,

      data,

      {

        new: true,

        runValidators: true,

      }

    ).populate("employee");

  }

  /* ==========================
          Delete
  ========================== */

  async delete(id) {

    return await Leave.findByIdAndDelete(id);

  }

}

export default new LeaveRepository();