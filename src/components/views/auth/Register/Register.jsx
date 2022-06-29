import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Switch, FormControlLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../Auth.styles.css";

const { REACT_APP_API_ENDPOINT } = process.env;

export const Register = () => {
  const [data, setData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${REACT_APP_API_ENDPOINT}auth/data`)
      .then((response) => response.json())
      .then((data) => setData(data.result));

    return () => {};
  }, []);

  const required = "* Campo obligatorio";

  const validationSchema = () =>
    Yup.object().shape({
      userName: Yup.string()
        .min(4, "La cantidad minima de caracteres es 4.")
        .required(required),
      password: Yup.string().required(required),
      email: Yup.string().email("Debe ser un email válido.").required(required),
      role: Yup.string().required(required),
      continent: Yup.string().required(required),
      region: Yup.string().required(required),
    });

  const handleChangeContinent = (value) => {
    setFieldValue("continent", value);
    if (value !== "America") setFieldValue("region", "Otro");
  };

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
      email: "",
      teamID: "",
      role: "",
      continent: "",
      region: "",
      switch: false,
    },
    validationSchema,
    onSubmit: () => {
      const teamID = values.teamID ?? uuidv4();

      fetch(`${REACT_APP_API_ENDPOINT}auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            userName: values.userName,
            password: values.password,
            email: values.email,
            teamID,
            role: values.role,
            continent: values.continent,
            region: values.region,
          },
        }),
      })
        .then((response) => response.json())
        .then((data) =>
          navigate("/registered/" + data?.result?.user?.teamID, {
            replace: true,
          })
        );
    },
  });

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    errors,
    touched,
    values,
    setFieldValue,
  } = formik;

  return (
    <div className="auth">
      <form onSubmit={handleSubmit}>
        <h1>Registro</h1>

        <div>
          <label>Nombre de usuario</label>
          <input
            type="text"
            name="userName"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.userName}
            className={errors.userName && touched.userName ? "error" : ""}
          />
          {errors.userName && touched.userName && (
            <span className="error-message">{errors.userName}</span>
          )}
        </div>

        <div>
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            className={errors.password && touched.password ? "error" : ""}
          />
          {errors.password && touched.password && (
            <span className="error-message">{errors.password}</span>
          )}
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            className={errors.email && touched.email ? "error" : ""}
          />
          {errors.email && touched.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>

        <FormControlLabel
          control={
            <Switch
              value={values.switch}
              onChange={() => setFieldValue("switch", !values.switch)}
              name="switch"
              color="secondary"
            />
          }
          label="Pertenecés a un equipo ya creado"
        />
        {values.switch && (
          <div>
            <label>Por favor, introduce el identificador de equipo</label>
            <input
              type="text"
              name="teamID"
              value={values.teamID}
              onChange={handleChange}
            />
          </div>
        )}

        <div>
          <label>Rol</label>
          <select
            name="role"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.role}
            className={errors.role && touched.role ? "error" : ""}
          >
            <option value="">Seleccionar rol...</option>
            {data?.Rol?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.role && touched.role && (
            <span className="error-message">{errors.role}</span>
          )}
        </div>

        <div>
          <label>Continente</label>
          <select
            name="continent"
            onChange={(event) =>
              handleChangeContinent(event.currentTarget.value)
            }
            onBlur={handleBlur}
            value={values.continent}
            className={errors.continent && touched.continent ? "error" : ""}
          >
            <option value="">Seleccionar continente...</option>
            {data?.continente?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.continent && touched.continent && (
            <span className="error-message">{errors.continent}</span>
          )}
        </div>

        {values.continent === "America" && (
          <div>
            <label>Región</label>
            <select
              name="region"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.region}
              className={errors.region && touched.region ? "error" : ""}
            >
              <option value="">Seleccionar región...</option>
              {data?.region?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.region && touched.region && (
              <span className="error-message">{errors.region}</span>
            )}
          </div>
        )}

        <div>
          <button type="submit">Enviar</button>
        </div>

        <div>
          <Link to="/login">Iniciar sesión</Link>
        </div>
      </form>
    </div>
  );
};
