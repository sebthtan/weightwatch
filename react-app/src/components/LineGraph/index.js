import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './LineGraph.css'
import { AddOutlined } from '@material-ui/icons'
import Modal from 'react-modal'
import EntryForm from '../EntryForm'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

Modal.setAppElement('#root')

const LineGraph = () => {
    const dispatch = useDispatch()
    const entries = useSelector(state => state.entries)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [trackWeight, setTrackWeight] = useState('Body Weight')
    const isBodyWeight = trackWeight === 'Body Weight'
    const isBench = trackWeight === 'Bench Press'
    const isSquat = trackWeight === 'Squat'
    const isDeadlift = trackWeight === 'Deadlift'

    const forceAnimation = (key) => {
        let data = []
        entries.forEach(entry => {
            let obj = {}
            obj[key] = entry[key]
            obj['created_at'] = entry.created_at
            data.push(obj)
        })
        return data
    }

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    useEffect(() => {
        if (isModalOpen) {
            document.body.classList.add('overflow-hidden')
        } else {
            document.body.classList.remove('overflow-hidden')
        }
    }, [isModalOpen])

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '50vw'
        },
        overlay: {
            backgroundColor: 'rgba(20, 20, 20, 0.6)',
            zIndex: '21'
        }
    };

    let weightType
    let domain
    if (trackWeight === 'Body Weight') {
        weightType = 'body_weight'
        domain = [80, 'auto']
    } else if (trackWeight === 'Bench Press') {
        weightType = 'bench_press'
        domain = [45, 'dataMax + 60']
    } else if (trackWeight === 'Squat') {
        weightType = 'squat'
        domain = [45, 'dataMax + 60']
    } else if (trackWeight === 'Deadlift') {
        weightType = 'deadlift'
        domain = [45, 'dataMax + 60']
    }

    const lbs = <span style={{ color: 'rgb(234, 128, 252, 0.3' }}>(lbs)</span>

    // Do not try to refactor this; will cause infinite rerenders for some reason
    const changeToBodyWeight = () => {
        setTrackWeight('Body Weight')
    }

    const changeToBenchWeight = () => {
        setTrackWeight('Bench Press')
    }

    const changeToSquatWeight = () => {
        setTrackWeight('Squat')
    }

    const changeToDeadliftWeight = () => {
        setTrackWeight('Deadlift')
    }

    return (
        entries.length > 0 && (
            <div className='container flex justify-center min-w-full p-8'>
                <div className='m-0 container w-3/5 p-4 flex flex-col items-center justify-center font-sans bg-white  bg-opacity-5 rounded-xl'>
                    <div className='container flex justify-center items-center self-end w-6 h-6 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30'>
                        <button onClick={openModal} className='w-6 h-6 flex justify-center items-center'>
                            <AddOutlined className='text-gray-300' style={{ color: '#fcf480' }} />
                        </button>
                    </div>
                    <Modal className='absolute' isOpen={isModalOpen} onRequestClose={closeModal} contentLabel='test' style={customStyles}>
                        <div className='container flex bg-light'>
                            <EntryForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
                        </div>
                    </Modal>
                    <div className='container flex justify-between items-center pb-8 px-4'>
                        <div className='container flex flex-col justify-center items-center'>
                            <button className='flex justify-center items-center focus:outline-none' onClick={changeToBodyWeight}>
                                <h1 className='text-gray-300 text-2xl font-bold-hover font-light' style={isBodyWeight ? { fontWeight: '750', color: '#ea80fc' } : {}}>
                                    Body Weight
                        </h1>
                            </button>
                            {isBodyWeight ? lbs : <></>}
                        </div>
                        <div className='container flex flex-col justify-center items-center'>
                            <button className='flex justify-center items-center focus:outline-none' onClick={changeToBenchWeight}>
                                <h1 className='text-gray-300 text-2xl font-bold-hover font-light' style={isBench ? { fontWeight: '750', color: '#ea80fc' } : {}}>
                                    Bench Press
                        </h1>
                            </button>
                            {isBench ? lbs : <></>}
                        </div>
                        <div className='container flex flex-col justify-center items-center'>
                            <button className='flex justify-center items-center focus:outline-none' onClick={changeToSquatWeight}>
                                <h1 className='text-gray-300 text-2xl font-bold-hover font-light' style={isSquat ? { fontWeight: '750', color: '#ea80fc' } : {}}>
                                    Squat
                        </h1>
                            </button>
                            {isSquat ? lbs : <></>}
                        </div>
                        <div className='container flex flex-col justify-center items-center'>
                            <button className='flex justify-center items-center focus:outline-none' onClick={changeToDeadliftWeight}>
                                <h1 className='text-gray-300 text-2xl font-bold-hover font-light' style={isDeadlift ? { fontWeight: '750', color: '#ea80fc' } : {}}>
                                    Deadlift
                        </h1>
                            </button>
                            {isDeadlift ? lbs : <></>}
                        </div>
                    </div>
                    <ResponsiveContainer width='90%' height={300}>
                        <LineChart
                            width={800}
                            height={300}
                            data={forceAnimation(weightType)}
                        >
                            <XAxis dataKey="created_at" axisLine={false} tickLine={false} />
                            <YAxis domain={domain} dataKey={weightType} axisLine={false} tickLine={false} />
                            <Line animationDuration={800} type="monotone" dataKey={weightType} stroke="#ea80fc" yAxisId={0} activeDot={{ stroke: 'darkblue' }} />
                            <CartesianGrid vertical={false} strokeDasharray='3' />
                            <Tooltip className='text-gray' />
                        </LineChart>
                    </ResponsiveContainer>
                    {/* <div className='container flex items-center w-full justify-around text-gray-300'>
                <button className='focus:outline-none flex justify-center items-center font-bold' >
                <span>1M</span>
                </button>
                <button className='focus:outline-none flex justify-center items-center font-bold'>
                <span>6M</span>
                </button>
                <button className='focus:outline-none flex justify-center items-center font-bold'>
                <span>1Y</span>
                    </button>
                    <button className='focus:outline-none flex justify-center items-center font-bold'>
                    <span>All</span>
                    </button>
                </div> */}
                </div>
            </div>
        )
    )
}

export default LineGraph
