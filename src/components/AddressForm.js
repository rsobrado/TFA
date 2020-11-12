
import React, { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { FormControl,Button } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import { makeStyles } from '@material-ui/core/styles'
import statesData from '../data/states.json'


import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';


const useStyles = makeStyles((theme) => ({
	error: {
		color: 'red',
		fontSize: '.7rem',
		paddingTop: '2px',
		position: 'abosul',
		bottom: '-15px'
	},
	subtitle:{
		opacity: '0.7',
		lineHeight:1.2,
		marginTop: 15,
		marginBottom: 20

		
	}

}))


const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="down" ref={ref} {...props} />;
});

export default function AddressForm() {
	const classes = useStyles()
	const [addressStates, setAddressStates] = useState([])
	const [open, setOpen] = useState(false);
	const [errors, setErrors] = useState(false);

	const [addressStreet, setAddressStreet] = useState(' ')
	const [errorAddressStreet, setErrorAddressStreet] = useState(' ')
	const [okAddressStreet, setOkAddressStreet] = useState(false)
	const [addressCity, setAddressCity] = useState(' ')
	const [errorAddressCity, setErrorAddressCity] = useState(' ')
	const [okAddressCity, setOkAddressCity] = useState(false)
	const [addressState, setAddressState] = useState(' ')
	const [errorAddressState, setErrorAddressState] = useState(' ')
	const [okAddressState, setOkAddressState] = useState(false)
	const [addressZipCode, setAddressZipCode] = useState('0')
	const [errorAddressZipCode, setErrorAddressZipCode] = useState('')
	const [okAddressZipCode, setOkAddressZipCode] = useState(false)

	// ****** static Data from array
	const loadData = () => {
		setAddressStates(statesData)
	}

	useEffect(() => {
		loadData()
	}, [])


	const handleSubmit = (event) => {
		noneEmpty()
		handleOpen()
	}


	useEffect(() => {
		if(addressStreet===""){
			setErrorAddressStreet("Address Street information is required")
		}else{
			setErrorAddressStreet("")
		}
	}, [addressStreet]);

	useEffect(() => {
		if(addressCity===""){
			setErrorAddressCity("Address City information is required")
		}else{
			setErrorAddressCity("")
		}
	}, [addressCity]);

	useEffect(() => {
		if(addressState===""){
			setErrorAddressState("Address State information is required")
		}else{
			setErrorAddressState("")
		}
	}, [addressState]);

	useEffect(() => {
		setErrors(errors)
	}, [errors]);

	const addressStreetUpdate = (event) => {
		setAddressStreet(event.target.value)
	}


	const addressCityUpdate = (event) => {
		setAddressCity(event.target.value)
	}
	const addressStateUpdate = (event) => {
		setAddressState(event.target.value)
	}
	const addressZipCodeUpdate = (event) => {
		setAddressZipCode(event.target.value)
	}


	const handleOpen = () => {
		setOpen(true);
	};
	
	const handleClose = () => {
		setOpen(false);
	};
	const handleError = (val) => {
		setErrors(val);
	};

	const noneEmpty = (event) => {
		if(addressStreet==="" || addressStreet===" "){
			setErrorAddressStreet("Address Street information is required")
			setOkAddressStreet(false)
		}else{
			setErrorAddressStreet("")
			setOkAddressStreet(true)
		}
		if(addressCity==="" || addressCity===" "){
			setErrorAddressCity("City name information is required")
			setOkAddressCity(false)
		}else{
			setErrorAddressCity("")
			setOkAddressCity(true)
		}
		if(addressState==="" || addressState===" "){
			setErrorAddressState("State name information is required")
			setOkAddressState(false)
		}else{
			setErrorAddressState("")
			setOkAddressState(true)
		}
		if(addressZipCode==="" || addressZipCode===" "|| addressZipCode==='0'){
			setErrorAddressZipCode("ZipCode information is required")
			setOkAddressZipCode(false)
		}else{
			setErrorAddressZipCode("")
			setOkAddressZipCode(true)
		}
		if((okAddressStreet===true) && (okAddressCity===true) && (okAddressState===true) && (okAddressZipCode===true)){
			handleError(false)
		}else{
			handleError(true)
		}
	}

	return (
		<>
			<Container fixed>
				<h2 tabIndex="1" aria-label="Address Form heading" >Address Form</h2>
				<h5 tabIndex="2" aria-label="Address Form Sub Heading"className={classes.subtitle} > Please provide your address information</h5>
				<form 
					aria-label="Address Data Form" 
					aria-labelledby="address"
					noValidate 
					autoComplete="off" 
					style = {{ 
						maxWidth:'380px', 
						width: '100%'
					}} 
					tabIndex="3" 
					onSubmit={
						(e) => {
							e.preventDefault();
							e.stopPropagation();
							handleSubmit()
						}
					}
				>
					<FormControl style={{width: '100%'}} aria-label="Street Address input" role="form"  tabIndex="5">
						<InputLabel htmlFor="address--street" required aria-label="Street Address Label" >Street Address</InputLabel>
						<Input id="address--street" placeholder="Street Address" autoFocus  onChange={addressStreetUpdate} aria-label="Street Address input" role="input" tabIndex="6"/>
						<div className={classes.error} tabIndex="7"  aria-label="Street address error label"  >{errorAddressStreet}</div>
					</FormControl>
					
					<div style={{display:'flex', alignItems: 'flex-end'}}>
						<FormControl  aria-labelledby="City name input" role="form" tabIndex="8">
							<InputLabel htmlFor="address--city" required > City</InputLabel>
							<Input id="address--city" placeholder="City" tabIndex="9"   aria-label="City Address input" role="input"  onChange={addressCityUpdate}   />
							<div className={classes.error} tabIndex="10"  aria-label="City error label"  >{errorAddressCity}</div>
						</FormControl>
						<FormControl style={{marginLeft:'25px', width:'50%'}} aria-labelledby="State name input"  role="form"  tabIndex="11">
							<Autocomplete
								id="states"
								role="input"  
								aria-label="Street Address input" 
								options={addressStates}
								onChange={addressStateUpdate}
								getOptionLabel={(addressState) => addressState.name}
								renderInput={(params) => <TextField {...params} 
								label="State" 
								required
								tabIndex="12" 
								/>}
							/><div className={classes.error} tabIndex=""  aria-label="State error label" >{errorAddressState}</div>
						</FormControl>
					</div>

					<FormControl style={{ width:'48%'}} tabIndex="12" aria-labelledby="Zipcode input" role="form" t>
						<InputLabel htmlFor="address--zipcode" required>ZipCode</InputLabel>
						<Input id="address--zipcode" placeholder="ZipCode" type="number" pattern='[0-9]{0,5}' tabIndex="12"  aria-label="ZipCode input"  onChange={addressZipCodeUpdate}   aria-label="Zicode  input"  role="input" />
						<div className={classes.error} tabIndex="10"  aria-label="State error label" >{errorAddressZipCode}</div>
					</FormControl>
					<div dir="rtl"> 
						<FormControl>
							<Button variant="contained" color="primary"  role="submit info"  tabIndex="13" >Submit</Button>
						</FormControl>
					</div>
				</form>
				

				<Dialog
					open={open}
					TransitionComponent={Transition}
					keepMounted
					onClose={handleClose}
					aria-labelledby="alert-dialog-slide-title"
					aria-describedby="alert-dialog-slide-description"
					role="presentation" 
					aria-label="Message Dialog" 
				>
					<DialogTitle id="alert-dialog-slide-title" role="presentation" > 
						{
							errors ? 
							'Something went wrong '
							: 
							'Information Submitted Successfully'
						}
						</DialogTitle>
					<DialogContent >
						{
							errors ? 
							<div role="presentation" >
								<h3 >Some information is not correct</h3>
								<h4 aria-label="Street address name Error" >{errorAddressStreet}</h4>
								<h4 aria-label="City name Error" > {errorAddressCity}</h4>
								<h4 aria-label="State name Error" >{errorAddressState}</h4>
								<h4 aria-label="Zipcode  Error" >{errorAddressZipCode}</h4>
							</div>
							: 
							<h3 aria-label="information submitted">Your information has been submitted.</h3>
						}
					</DialogContent>
					<DialogActions>
					<Button onClick={handleClose} color="secondary" role="input" >
						Ok
					</Button>
					</DialogActions>
				</Dialog>
			</Container>
		</>
	)

}