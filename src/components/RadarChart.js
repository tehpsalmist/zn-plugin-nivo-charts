import React, { useState, useEffect } from 'react'
import { ResponsiveRadar } from '@nivo/radar'
import { getRecords } from '../zengine'
import { async } from 'q'

export const RadarChart = ({ context }) => {
  if (context.loading) return 'Loading...'

  const [error, setError] = useState('')

  if (error) return error

  const [data, setData] = useState([
    {
      "subject": "Math",
      "0 unexcused absences": 96,
      "1-2 unexcused absences": 84,
      "3+ unexcused absences": 71
    },
    {
      "subject": "English",
      "0 unexcused absences": 62,
      "1-2 unexcused absences": 62,
      "3+ unexcused absences": 96
    },
    {
      "subject": "Science",
      "0 unexcused absences": 82,
      "1-2 unexcused absences": 68,
      "3+ unexcused absences": 20
    },
    {
      "subject": "History",
      "0 unexcused absences": 33,
      "1-2 unexcused absences": 32,
      "3+ unexcused absences": 71
    },
    {
      "subject": "PE",
      "0 unexcused absences": 98,
      "1-2 unexcused absences": 96,
      "3+ unexcused absences": 96
    }
  ])

  useEffect(() => {
    Promise.all([
      getRecords(11981),
      getRecords(11998),
      getRecords(11999),
    ])
      .then(async ([studentResponse, reportCards, absences]) => {
        console.log(studentResponse)
        console.log(reportCards)
        console.log(absences)
        console.log(context.fields)

        const students = studentResponse.reduce((studentlist, student) => ({
          ...studentlist,
          [student.id]: { absences: 0 }
        }), {})

        console.log(students)

        absences.forEach(absence => {
          if (!absence.field83459) {
            students[absence.field83461.id].absences += 1
          }
        });

        reportCards.forEach(rc => {
          students[rc.field83457.id] = {
            ...students[rc.field83457.id],
            [context.fields.field83452.label]: rc.field83452,
            [context.fields.field83453.label]: rc.field83453,
            [context.fields.field83454.label]: rc.field83454,
            [context.fields.field83455.label]: rc.field83455,
            [context.fields.field83456.label]: rc.field83456
          }
        })

        const studentGroups = Object.keys(students).map(key => students[key]).reduce((groups, student) => {
          if (student.absences > 2) groups['3+ unexcused absences'].push(student)
          else if (student.absences > 0) groups['1-2 unexcused absences'].push(student)
          else groups['0 unexcused absences'].push(student)

          return groups
        }, { '0 unexcused absences': [], '1-2 unexcused absences': [], '3+ unexcused absences': [] })

        setData(['Math', 'English', 'Science', 'History', 'PE'].map(subject => ({
          subject,
          ...Object.keys(studentGroups).reduce((props, key) => ({
            ...props,
            [key]: (studentGroups[key].reduce((total, student) => Number(student[subject]) + total, 0) / studentGroups[key].length).toFixed(2)
          }), {})
        })))
      })
      .catch(err => setError('Error Fetching Records'))
  }, [])

  return <div className='h-1 flex-grow'>
    <ResponsiveRadar
      data={data}
      keys={['0 unexcused absences', '1-2 unexcused absences', '3+ unexcused absences']}
      indexBy="subject"
      maxValue="auto"
      margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
      curve="cardinalClosed"
      borderWidth={2}
      borderColor={{ from: 'color' }}
      gridLevels={5}
      gridShape="circular"
      gridLabelOffset={36}
      enableDots={true}
      dotSize={10}
      dotColor={{ theme: 'background' }}
      dotBorderWidth={2}
      dotBorderColor={{ from: 'color' }}
      enableDotLabel={true}
      dotLabel="value"
      dotLabelYOffset={-12}
      colors={{ scheme: 'category10' }}
      fillOpacity={0.25}
      blendMode="multiply"
      animate={true}
      motionStiffness={90}
      motionDamping={15}
      isInteractive={true}
      legends={[
        {
          anchor: 'top-left',
          direction: 'column',
          translateX: -50,
          translateY: -40,
          itemWidth: 80,
          itemHeight: 20,
          itemTextColor: '#999',
          symbolSize: 12,
          symbolShape: 'circle',
          effects: [
            {
              on: 'hover',
              style: {
                itemTextColor: '#000'
              }
            }
          ]
        }
      ]}
    />
  </div>
}
