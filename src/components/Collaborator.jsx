import React, { useContext } from 'react';
import { CollaborationContext } from '../context/CollaborationContext';

const Collaborators = () => {
    const { collaborators } = useContext(CollaborationContext);

    return (
        <div className="collaborators">
            {collaborators.map(collaborator => (
                <div
                    key={collaborator.id}
                    style={{
                        position: 'absolute',
                        left: collaborator.position.x,
                        top: collaborator.position.y,
                        backgroundColor: 'blue',
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                    }}
                >
                </div>
            ))}
        </div>
    );
};

export default Collaborators;
