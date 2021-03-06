/*
=======================================
// Title: Bob’s Computer Repair Shop
// Date: 4 May 2022
// Authors: Evan Durkin, Keith Hall,
// Gustavo Roo Gonzalez, and Gunner Bradley
// Description: CRUD APIs for roles
=======================================
*/

// Require statements
const express = require("express");
const Role = require("../models/role");
const User = require("../models/user");
const ErrorResponse = require("../services/error-response");
const BaseResponse = require("../services/base-response");

const router = express.Router();

//  FindAllRoles
router.get("/", async (req, res) => {
  try {
    // Find all that are not disabled.
    Role.find({})
      .where("isDisabled")
      .equals(false)
      .exec(function (err, roles) {
        // Server Responses
        if (err) {
          console.log(err);
          const findAllRolesErrorResponse = new ErrorResponse(
            "500",
            "internal Server error",
            err
          );
          res.status(500).send(findAllRolesErrorResponse.toObject());
        } else {
          console.log(roles);
          const findAllRolesBaseResponse = new BaseResponse(
            "200",
            "Query successful",
            roles
          );
          res.json(findAllRolesBaseResponse.toObject());
        }
      });
  } catch (e) {
    console.log(e);
    const findAllRolesCatchErrorResponse = new ErrorResponse(
      "500",
      "Internal server error",
      e.message
    );
    res.status(500).send(findAllRolesCatchErrorResponse.toObject());
  }
});

// Find user role by ID
router.get("/:roleId", async (req, res) => {
  try {
    //finds the role ID number
    Role.findOne({ _id: req.params.roleId }, function (err, role) {
      if (err) {
        // if error, response with 500 error message
        console.log(err);
        const findRoleByIdMongodbErrorResponse = new ErrorResponse(
          "500",
          "Internal Server Error",
          err
        );
        res.status(500).send(findRoleByIdMongodbErrorResponse.toObject());
      } else {
        // if success it returns the role
        console.log(role);
        const findRoleByIdResponse = new BaseResponse(
          "200",
          "Query Successful",
          role
        );
        res.json(findRoleByIdResponse.toObject());
      }
    });
  } catch (e) {
    console.log(e);
    const findRoleByIdCatchErrorResponse = new ErrorResponse(
      "500",
      "Internal Server Error",
      e.message
    );
    res.status(500).send(findRoleByIdCatchErrorResponse.toObject());
  }
});

// Find user role by username
router.get("/:username/role", async (req, res) => {
  try {
    Role.findOne({ username: req.params.userName }, function (err, role) {
      // Server Responses
      if (err) {
        console.log(err);
        const findRoleByUserNameErrorResponse = new ErrorResponse(
          "500",
          "internal Server error",
          err
        );
        res.status(500).send(findRoleByUserNameErrorResponse.toObject());
      } else {
        console.log(role);
        const findRoleByUserNameBaseResponse = new BaseResponse(
          "200",
          "Query successful",
          role
        );
        res.json(findRoleByUserNameBaseResponse.toObject());
      }
    });
  } catch (e) {
    console.log(e);
    const findRoleByUserNameCatchErrorResponse = new ErrorResponse(
      "500",
      "Internal server error",
      e.message
    );
    res.status(500).send(findRoleByUserNameCatchErrorResponse.toObject());
  }
});

/**
 * API: createRole goes here
 */
router.post("/", async (req, res) => {
  try {
    let newRole = {
      text: req.body.text,
    };

    Role.create(newRole, function (err, role) {
      if (err) {
        console.log(err);
        const createRoleMongodbErrorResponse = new ErrorResponse(
          500,
          "Internal server error",
          err
        );
        res.status(500).send(createRoleMongodbErrorResponse.toObject());
      } else {
        console.log(role);
        const createRole = new BaseResponse(200, "Query successful", role);
        res.json(createRole.toObject());
      }
    });
  } catch (err) {
    console.log(err);
    const createRoleErrorResponse = new ErrorResponse(
      500,
      "Internal server error",
      err.message
    );
    res.status(500).send(createRoleErrorResponse.toObject());
  }
});

// Delete role by id
router.delete("/:roleId", async (req, res) => {
  try {
    // Find the role by id
    Role.findOne({ _id: req.params.roleId }, function (err, role) {
      if (err) {
        console.log(err);
        const deleteRoleErrorResponse = new ErrorResponse(
          "500",
          "Internal server error",
          err
        );
        res.status(500).send(deleteRoleErrorResponse.toObject());

        // If successful
      } else {
        console.log(role);

        // Look up role to determine if assigned to an existing user.
        User.aggregate(
          [
            {
              $lookup: {
                from: "roles",
                localField: "role.role",
                foreignField: "text",
                as: "userRoles",
              },
            },
            {
              $match: {
                "userRoles.text": role.text,
              },
            },
          ],
          function (err, users) {
            console.log(users);
            if (err) {
              console.log(err);
              const usersErrorResponse = new ErrorResponse(
                "500",
                "Internal server error",
                err
              );
              res.status(500).send(usersErrorResponse.toObject());
            } else {
              // If the role is assigned then it cannot be disabled.
              if (users.length > 0) {
                console.log(
                  `Role <${role.text}> is already in use and cannot be deleted`
                );
                const userRoleAlreadyInUseResponse = new BaseResponse(
                  "400",
                  `Role '${role.text}' is in use.`,
                  role
                );
                res.status(400).send(userRoleAlreadyInUseResponse.toObject());
              } else {
                console.log(
                  `Role <${role.text}> is not an active role and can be safely removed`
                );
                role.set({ isDisabled: true });

                // Save the role
                role.save(function (err, updatedRole) {
                  if (err) {
                    console.log(err);
                    const updatedRoleErrorResponse = new ErrorResponse(
                      "500",
                      "Internal server error",
                      err
                    );
                    res.status(500).send(updatedRoleErrorResponse.toObject());

                    // Remove the role
                  } else {
                    console.log(updatedRole);
                    const roleDeletedResponse = new BaseResponse(
                      "200",
                      `Role '${role.text}' has been removed successfully`,
                      updatedRole
                    );
                    res.json(roleDeletedResponse.toObject());
                  }
                });
              }
            }
          }
        );
      }
    });
  } catch (e) {
    console.log(e);
    const deleteRoleCatchErrorResponse = new ErrorResponse(
      "500",
      "Internal server error",
      e.message
    );
    res.status(500).send(deleteRoleCatchErrorResponse.toObject());
  }
});

/**
 * updateRole by ID
 */
router.get("/:roleId", async (req, res) => {
  try {
    Role.findOne({ _id: req.params.roleId }, function (err, role) {
      if (err) {
        console.log(err);
        const findRoleByIdMongoDbErrorResponse = new ErrorResponse(
          500,
          "Internal server error",
          err
        );
        res.status(500).send(findRoleByIdMongoDbErrorResponse.toObject());
      } else {
        console.log(role);
        const findRoleByIdResponse = new BaseResponse(
          200,
          "Query successful",
          role
        );
        res.json(findRoleByIdResponse.toObject());
      }
    });
  } catch (e) {
    console.log(e);
    const findRoleByIdCatchErrorResponse = new ErrorResponse(
      500,
      "Internal server error",
      e.message
    );
    res.status(500).send(findRoleByIdCatchErrorResponse.toObject());
  }
});

// updateRole
router.put("/:id", async (req, res) => {
  try {
    Role.findOne({ _id: req.params.id }, function (err, role) {
      if (err) {
        console.log(err);
        const updateRoleMongoDbErrorResponse = new ErrorResponse(
          500,
          "Internal server error",
          err
        );
        res.status(500).send(updateRoleMongoDbErrorResponse.toObject());
      } else {
        console.log(role);

        role.set({
          text: req.body.text,
        });

        role.save(function (err, updatedRole) {
          if (err) {
            console.log(err);
            const updatedRoleMongoDbErrorResponse = new ErrorResponse(
              500,
              "Internal server error",
              err
            );
            res.status(500).send(updatedRoleMongoDbErrorResponse.toObject());
          } else {
            console.log(updatedRole);
            const updatedRoleResponse = new BaseResponse(
              200,
              "Query successful",
              updatedRole
            );
            res.json(updatedRoleResponse.toObject());
          }
        });
      }
    });
  } catch (e) {
    console.log(e);
    const findRoleByIdCatchErrorResponse = new ErrorResponse(
      500,
      "Internal server error",
      e.message
    );
    res.status(500).send(findRoleByIdCatchErrorResponse.toObject());
  }
});

module.exports = router;
