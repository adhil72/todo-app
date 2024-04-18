import { TaskItemProps } from '@/Components/Feature/Board/Components/TaskItem'
import { Dialog } from '@mui/material'
import Text from '@/Components/Common/Text'
import Input from '@/Components/Common/Input'
import Button from '@/Components/Common/Button'

interface EditTaskPopupProps {
    onClose: () => void
    task?: TaskItemProps
    open: boolean
    editTask: (data: TaskItemProps, id: string) => void
}
export default function EditTaskPopup(props: EditTaskPopupProps) {
    const { onClose, task, open, editTask } = props
    let date = task
        ? new Date(task?.deadline || '')
              .toLocaleDateString(undefined, { day: 'numeric', month: 'numeric', year: 'numeric' })
              .split('/')
        : ['', '', '']

    const handleFormSubmit = async (e: any) => {
        e.preventDefault()
        let data: any = { ...task }
        const form: any = e.target
        for (let i = 0; i < form.length; i++) {
            const input = form[i]
            if (input.name) {
                data[input.name] = input.value
            }
        }

        data.deadline = new Date(data.deadline).toDateString()
        await editTask(data, task?.id || '')
        window.location.reload()
        onClose()
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    borderRadius: '10px',
                },
            }}
        >
            <div style={{ width: '400px', height: 'auto' }}>
                <form onSubmit={handleFormSubmit} style={{ padding: '30px' }}>
                    <Text size={2} bold={true}>
                        Edit Task
                    </Text>
                    <Input name={'title'} sx={{ mt: 3 }} label={'Title'} defaultValue={task?.title} fullWidth />
                    <Input
                        name={'description'}
                        sx={{ mt: 1 }}
                        label={'Description'}
                        defaultValue={task?.description}
                        multiline
                        fullWidth
                    />
                    <Input
                        name={'deadline'}
                        label={'Deadline'}
                        sx={{ mt: 1 }}
                        fullWidth
                        defaultValue={`${date[2]}-${date[0].length === 1 ? '0' : ''}${date[0]}-${
                            date[1].length === 1 ? '0' : ''
                        }${date[1]}`}
                        type={'date'}
                    />
                    <Input name={'tag'} sx={{ mt: 1 }} label={'Tag'} defaultValue={task?.tag} fullWidth />
                    <Button type={'submit'} sx={{ mt: 3 }} fullWidth variant={'contained'}>
                        Save
                    </Button>
                </form>
            </div>
        </Dialog>
    )
}
